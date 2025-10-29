import React, { useCallback, useEffect, useRef, useState } from "react";
import { MdPlayArrow, MdPause, MdRefresh, MdSettings } from "react-icons/md";

type SessionType = "focus" | "shortBreak" | "longBreak";

interface TimerSettings {
  focusDuration: number; // seconds
  shortBreakDuration: number;
  longBreakDuration: number;
  sessionsUntilLongBreak: number;
}

const DEFAULT_SETTINGS: TimerSettings = {
  focusDuration: 25 * 60,
  shortBreakDuration: 5 * 60,
  longBreakDuration: 15 * 60,
  sessionsUntilLongBreak: 4,
};

const TimerPanel: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState<SessionType>("focus");
  const [settings, setSettings] = useState<TimerSettings>(() => {
    try {
      const raw = localStorage.getItem("pomodoro:settings");
      return raw ? (JSON.parse(raw) as TimerSettings) : DEFAULT_SETTINGS;
    } catch (err) {
      console.debug("Failed to load settings from localStorage:", err);
      return DEFAULT_SETTINGS;
    }
  });
  const [timeLeft, setTimeLeft] = useState<number>(settings.focusDuration);
  const [completedSessions, setCompletedSessions] = useState<number>(0);
  const [showSettings, setShowSettings] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const sessionRef = useRef(sessionType);
  sessionRef.current = sessionType;

  // keep timeLeft in sync when settings change or session type switches
  useEffect(() => {
    setTimeLeft(getTimeForSessionType(sessionType));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  useEffect(() => {
    // persist settings
    try {
      localStorage.setItem("pomodoro:settings", JSON.stringify(settings));
    } catch (err) {
      console.debug("Failed to persist settings:", err);
    }
  }, [settings]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  // react to timeLeft hitting zero
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSessionComplete();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  // keyboard shortcut: Space toggles start/pause
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (isRunning) {
          pauseTimer();
        } else {
          startTimer();
        }
      }
      if (e.key.toLowerCase() === "r") {
        resetTimer();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isRunning]);

  const getTimeForSessionType = (type: SessionType) => {
    switch (type) {
      case "focus":
        return settings.focusDuration;
      case "shortBreak":
        return settings.shortBreakDuration;
      case "longBreak":
        return settings.longBreakDuration;
    }
  };

  const startTimer = useCallback(() => setIsRunning(true), []);
  const pauseTimer = useCallback(() => setIsRunning(false), []);
  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setSessionType("focus");
    setCompletedSessions(0);
    setTimeLeft(settings.focusDuration);
  }, [settings.focusDuration]);

  const switchSession = useCallback(
    (type: SessionType) => {
      setSessionType(type);
      setTimeLeft(getTimeForSessionType(type));
      setIsRunning(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [settings]
  );

  const handleSessionComplete = useCallback(() => {
    // ensure we don't double-run
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const focusEnded = sessionRef.current === "focus";

    // notification & sound
    try {
      const audio = new Audio("/notification.mp3");
      audio.play().catch((err) => {
        console.debug("audio.play() rejected:", err);
      });
    } catch (err) {
      console.debug("creating Audio failed:", err);
    }

    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission().catch((err) => {
        console.debug("Notification.requestPermission() failed:", err);
      });
    } else if (
      "Notification" in window &&
      Notification.permission === "granted"
    ) {
      const nextTitle = focusEnded ? "Break time!" : "Focus time!";
      new Notification("Pomodoro", { body: nextTitle });
    }

    // compute next session using functional updates to avoid stale state
    setCompletedSessions((prevCompleted) => {
      const newCompleted = focusEnded ? prevCompleted + 1 : prevCompleted;

      // decide next session based on the updated completed count
      const nextSession: SessionType = focusEnded
        ? newCompleted % settings.sessionsUntilLongBreak === 0
          ? "longBreak"
          : "shortBreak"
        : "focus";

      // apply next session and reset timer
      setSessionType(nextSession);
      setTimeLeft(getTimeForSessionType(nextSession));
      setIsRunning(false);

      return newCompleted;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  const formatTime = (seconds: number) => {
    const s = Math.max(0, Math.floor(seconds));
    const mins = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const secs = (s % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const addMinutes = (m: number) => setTimeLeft((t) => t + m * 60);

  return (
    <>
      <div className="w-full max-w-3xl mx-auto bg-[#1b1b1b] rounded-2xl p-8 flex flex-col items-center gap-6 shadow-lg">
        {/* Tabs */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => switchSession("focus")}
            aria-pressed={sessionType === "focus"}
            className={`px-4 py-2 rounded-md text-sm transition transform ${
              sessionType === "focus"
                ? "bg-neutral-800 text-white shadow"
                : "text-gray-400 hover:text-white hover:bg-[#151515]"
            }`}>
            Focus
          </button>
          <button
            onClick={() => switchSession("shortBreak")}
            aria-pressed={sessionType === "shortBreak"}
            className={`px-4 py-2 rounded-md text-sm transition transform ${
              sessionType === "shortBreak"
                ? "bg-neutral-800 text-white shadow"
                : "text-gray-400 hover:text-white hover:bg-[#151515]"
            }`}>
            Short Break
          </button>
          <button
            onClick={() => switchSession("longBreak")}
            aria-pressed={sessionType === "longBreak"}
            className={`px-4 py-2 rounded-md text-sm transition transform ${
              sessionType === "longBreak"
                ? "bg-neutral-800 text-white shadow"
                : "text-gray-400 hover:text-white hover:bg-[#151515]"
            }`}>
            Long Break
          </button>
        </div>

        {/* Session label */}
        <div
          className={`text-lg font-medium transition-colors ${
            sessionType === "focus" ? "text-red-500" : "text-green-400"
          }`}
          aria-live="polite">
          {sessionType === "focus"
            ? "Focus Time"
            : sessionType === "shortBreak"
            ? "Short Break"
            : "Long Break"}
        </div>

        {/* Timer display */}
        <div className="text-8xl font-extrabold tabular-nums select-none">
          {formatTime(timeLeft)}
        </div>

        {/* Quick add minutes */}
        <div className="w-full border-t border-neutral-700 pt-4 flex items-center justify-center gap-6">
          <button
            onClick={() => addMinutes(25)}
            className="text-sm text-gray-400 hover:text-white transition"
            aria-label="Add 25 minutes">
            + 25 min
          </button>
          <button
            onClick={() => addMinutes(10)}
            className="text-sm text-gray-400 hover:text-white transition"
            aria-label="Add 10 minutes">
            + 10 min
          </button>
          <button
            onClick={() => addMinutes(5)}
            className="text-sm text-gray-400 hover:text-white transition"
            aria-label="Add 5 minutes">
            + 5 min
          </button>
          <button
            onClick={() => addMinutes(1)}
            className="text-sm text-gray-400 hover:text-white transition"
            aria-label="Add 1 minute">
            + 1 min
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={isRunning ? pauseTimer : startTimer}
            aria-label={isRunning ? "Pause timer" : "Start timer"}
            className={`px-6 py-2 rounded-lg flex items-center gap-2 transition transform ${
              isRunning
                ? "bg-red-600 hover:bg-red-700"
                : "bg-red-500 hover:bg-red-600"
            }`}>
            {isRunning ? <MdPause size={20} /> : <MdPlayArrow size={20} />}
            <span className="hidden sm:inline">
              {isRunning ? "Pause" : "Start"}
            </span>
          </button>

          <button
            onClick={resetTimer}
            aria-label="Reset timer"
            className="px-4 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 transition flex items-center gap-2">
            <MdRefresh />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={() => setShowSettings(true)}
            aria-label="Open settings"
            className="px-4 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 transition flex items-center gap-2">
            <MdSettings />
            <span className="hidden sm:inline">Settings</span>
          </button>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-2 mt-2">
          {Array.from({ length: settings.sessionsUntilLongBreak }).map(
            (_, i) => {
              const active =
                i < completedSessions % settings.sessionsUntilLongBreak;
              return (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    active ? "bg-red-500" : "bg-neutral-700"
                  }`}
                  aria-hidden
                />
              );
            }
          )}
        </div>

        <div className="text-xs text-neutral-500 mt-2">
          Press Space to Start/Pause • R to Reset
        </div>
      </div>

      {showSettings && (
        <SettingsModal
          settings={settings}
          onSave={(s) => {
            setSettings(s);
            setShowSettings(false);
            // apply new settings & reset current session time
            setTimeLeft(getTimeForSessionType(sessionType));
          }}
          onClose={() => setShowSettings(false)}
        />
      )}
    </>
  );
};

/* ---------------- Settings Modal (inline) ---------------- */

const SettingsModal: React.FC<{
  settings: TimerSettings;
  onSave: (s: TimerSettings) => void;
  onClose: () => void;
}> = ({ settings, onSave, onClose }) => {
  const [local, setLocal] = useState<TimerSettings>(settings);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-40"
      role="dialog"
      aria-modal="true"
      aria-label="Timer settings"
      onClick={onClose}>
      <div
        className="bg-[#161616] rounded-lg p-6 w-96"
        onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold mb-4">Timer Settings</h3>

        <label className="block text-sm mb-2">
          Focus (minutes)
          <input
            type="number"
            min={1}
            value={Math.round(local.focusDuration / 60)}
            onChange={(e) =>
              setLocal((l) => ({
                ...l,
                focusDuration: Number(e.target.value) * 60,
              }))
            }
            className="w-full mt-1 px-3 py-2 rounded bg-neutral-800"
          />
        </label>

        <label className="block text-sm mb-2">
          Short break (minutes)
          <input
            type="number"
            min={1}
            value={Math.round(local.shortBreakDuration / 60)}
            onChange={(e) =>
              setLocal((l) => ({
                ...l,
                shortBreakDuration: Number(e.target.value) * 60,
              }))
            }
            className="w-full mt-1 px-3 py-2 rounded bg-neutral-800"
          />
        </label>

        <label className="block text-sm mb-2">
          Long break (minutes)
          <input
            type="number"
            min={1}
            value={Math.round(local.longBreakDuration / 60)}
            onChange={(e) =>
              setLocal((l) => ({
                ...l,
                longBreakDuration: Number(e.target.value) * 60,
              }))
            }
            className="w-full mt-1 px-3 py-2 rounded bg-neutral-800"
          />
        </label>

        <label className="block text-sm mb-4">
          Sessions until long break
          <input
            type="number"
            min={1}
            value={local.sessionsUntilLongBreak}
            onChange={(e) =>
              setLocal((l) => ({
                ...l,
                sessionsUntilLongBreak: Number(e.target.value),
              }))
            }
            className="w-full mt-1 px-3 py-2 rounded bg-neutral-800"
          />
        </label>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-neutral-700">
            Cancel
          </button>
          <button
            onClick={() => onSave(local)}
            className="px-4 py-2 rounded bg-red-500 hover:bg-red-600">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerPanel;

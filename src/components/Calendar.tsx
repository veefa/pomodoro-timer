import React, { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarPage: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());

  const handleDateChange: CalendarProps["onChange"] = (value) => {
    if (value instanceof Date) {
      setDate(value);
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      setDate(value[0]); // pick first date if range
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-300 p-6">
      <h2 className="text-2xl font-bold mb-4">Calendar</h2>
      <Calendar
        onChange={handleDateChange}
        value={date}
        className="bg-[#1f1f1f] text-white rounded-md p-4"
      />
      <p className="mt-4">Selected Date: {date.toDateString()}</p>
    </div>
  );
};

export default CalendarPage;
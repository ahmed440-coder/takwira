import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1️⃣ Import navigation hook

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const times = [
  '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00'
];

const bookedSlots = {
  Mon: ['14:00', '17:00'],
  Tue: ['15:00'],
  Wed: [],
  Thu: ['16:00', '18:00'],
  Fri: ['12:00'],
  Sat: ['10:00', '20:00'],
  Sun: ['19:00']
};

const Calendar = () => {
  const [weekOffset, setWeekOffset] = useState(0);
  const navigate = useNavigate(); // 2️⃣ Create navigate instance

  const handleBooking = (day, time) => {
    // 3️⃣ Navigate to booking page with optional params or query
    navigate(`/booking?day=${day}&time=${time}`);
  };

  const handlePreviousWeek = () => setWeekOffset(weekOffset - 1);
  const handleNextWeek = () => setWeekOffset(weekOffset + 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white py-12 px-6 pt-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-red-500">📅 Live Availability</h1>
          <div className="space-x-4">
            <button onClick={handlePreviousWeek} className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-5 rounded-lg shadow transition transform hover:scale-105">⬅ Previous</button>
            <button onClick={handleNextWeek} className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-5 rounded-lg shadow transition transform hover:scale-105">Next ➡</button>
          </div>
        </div>

        <div className="grid grid-cols-8 text-center mb-2">
          <div className="text-sm font-semibold text-gray-400"></div>
          {days.map((day) => (
            <div key={day} className="text-md font-bold text-gray-200">{day}</div>
          ))}
        </div>

        <div className="grid grid-rows-12 gap-1">
          {times.map((time) => (
            <div key={time} className="grid grid-cols-8 gap-1">
              <div className="text-sm text-gray-400 py-3 text-center">{time}</div>
              {days.map((day) => {
                const isBooked = bookedSlots[day]?.includes(time);
                return (
                  <div
                    key={`${day}-${time}`}
                    className={`rounded-lg py-2 text-center text-sm font-medium transition duration-200 cursor-pointer ${
                      isBooked
                        ? 'bg-red-700/70 text-white opacity-70'
                        : 'bg-green-600 hover:bg-green-700 text-white hover:shadow-md hover:scale-[1.02]'
                    }`}
                  >
                    {isBooked ? 'Booked' : (
                      <button
                        onClick={() => handleBooking(day, time)}
                        className="font-semibold"
                      >
                        Book
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;

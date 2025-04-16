import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs'; // npm install dayjs

const times = [
  '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00'
];

// Example booked slots (format: { 'YYYY-MM-DD': ['time1', 'time2'] })
const bookedSlots = {
  '2025-04-14': ['14:00', '17:00'],
  '2025-04-15': ['15:00'],
  '2025-04-18': ['12:00'],
  '2025-04-20': ['19:00'],
};

const Calendar = () => {
  const [weekOffset, setWeekOffset] = useState(0);
  const navigate = useNavigate();

  // Get the start of the current week (Monday)
  const startOfWeek = dayjs().startOf('week').add(1, 'day').add(weekOffset, 'week'); // Monday-based

  // Generate 7 days based on current weekOffset
  const currentWeekDates = Array.from({ length: 7 }, (_, i) =>
    startOfWeek.add(i, 'day')
  );

  const handleBooking = (dateStr, time) => {
    navigate(`/booking?day=${dateStr}&time=${time}`);
  };

  const handlePreviousWeek = () => setWeekOffset((prev) => prev - 1);
  const handleNextWeek = () => setWeekOffset((prev) => prev + 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white py-12 px-6 pt-40">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-red-500">📅 Live Availability</h1>
          <div className="space-x-4">
            <button
              onClick={handlePreviousWeek}
              className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-5 rounded-lg shadow transition transform hover:scale-105"
            >
              ⬅ Previous
            </button>
            <button
              onClick={handleNextWeek}
              className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-5 rounded-lg shadow transition transform hover:scale-105"
            >
              Next ➡
            </button>
          </div>
        </div>

        <div className="grid grid-cols-8 text-center mb-2">
          <div className="text-sm font-semibold text-gray-400"></div>
          {currentWeekDates.map((date) => (
            <div key={date.format('YYYY-MM-DD')} className="text-md font-bold text-gray-200">
              {date.format('ddd')}<br />{date.format('DD/MM')}
            </div>
          ))}
        </div>

        <div className="grid grid-rows-12 gap-1">
          {times.map((time) => (
            <div key={time} className="grid grid-cols-8 gap-1">
              <div className="text-sm text-gray-400 py-3 text-center">{time}</div>
              {currentWeekDates.map((date) => {
                const dateStr = date.format('YYYY-MM-DD');
                const isBooked = bookedSlots[dateStr]?.includes(time);
                return (
                  <div
                    key={`${dateStr}-${time}`}
                    className={`rounded-lg py-2 text-center text-sm font-medium transition duration-200 cursor-pointer ${
                      isBooked
                        ? 'bg-red-700/70 text-white opacity-70'
                        : 'bg-green-600 hover:bg-green-700 text-white hover:shadow-md hover:scale-[1.02]'
                    }`}
                  >
                    {isBooked ? 'Booked' : (
                      <button
                        onClick={() => handleBooking(dateStr, time)}
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

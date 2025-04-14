import React, { useState } from 'react';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const times = [
  '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00'
];

// Fake booked slots for example
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

  const handlePreviousWeek = () => setWeekOffset(weekOffset - 1);
  const handleNextWeek = () => setWeekOffset(weekOffset + 1);

  return (
    <div className="min-h-screen bg-black text-white py-10 px-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-red-500">Live Calendar</h1>
        <div className="space-x-4">
          <button
            onClick={handlePreviousWeek}
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            Previous Week
          </button>
          <button
            onClick={handleNextWeek}
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            Next Week
          </button>
        </div>
      </div>

      {/* Grid Header */}
      <div className="grid grid-cols-8 gap-px bg-gray-700 text-center">
        <div className="bg-black"></div>
        {days.map((day) => (
          <div key={day} className="bg-gray-800 py-3 font-semibold">{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      {times.map((time) => (
        <div key={time} className="grid grid-cols-8 gap-px bg-gray-700">
          <div className="bg-gray-900 text-center py-3 font-medium text-sm">{time}</div>
          {days.map((day) => {
            const isBooked = bookedSlots[day]?.includes(time);
            return (
              <div
                key={`${day}-${time}`}
                className={`py-3 text-center text-sm cursor-pointer transition duration-200 ${
                  isBooked
                    ? 'bg-red-700 text-white opacity-70'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isBooked ? 'Booked' : (
                  <button className="font-semibold">Book</button>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Calendar;

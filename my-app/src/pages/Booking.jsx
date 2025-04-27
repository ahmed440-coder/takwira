import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

const generateTimeSlots = (selectedDate) => {
  const result = [];
  const currentDate = dayjs(selectedDate || new Date());
  let current = currentDate.startOf('day').hour(10).minute(0); // Start from 10:00 AM
  const endTime = currentDate.add(1, 'day').startOf('day'); // End after 1 day

  while (current.isBefore(endTime)) {
    const start = current.format('HH:mm');
    const end = current.add(90, 'minute').format('HH:mm');
    result.push(`${start} - ${end}`);
    current = current.add(90, 'minute');
  }

  return result;
};

const Booking = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const prefilledDate = queryParams.get('day');
  const prefilledTime = queryParams.get('time');
  const stadium = queryParams.get('stadium'); // Extracting stadium name from the query params

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: prefilledDate ? new Date(prefilledDate) : '',
    timeSlot: prefilledTime || '', // Adjusted for time slot input
    notes: '',
  });

  const [timeSlots, setTimeSlots] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/profile');
        const data = await response.json();

        setForm((prevForm) => ({
          ...prevForm,
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
        }));
        setLoading(false);
      } catch (error) {
        console.error('Failed to load user data', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (form.date) {
      const availableTimeSlots = generateTimeSlots(form.date);
      setTimeSlots(availableTimeSlots);
    }
  }, [form.date]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setForm({ ...form, date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.phone || !form.date || !form.timeSlot) {
      setIsError(true);
      return;
    }

    setIsSuccess(true);
    setIsError(false);

    // Backend booking logic goes here
    console.log('Booking submitted:', form);
  };

  if (loading) {
    return <div className="text-white text-center mt-20">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-800 text-white flex items-center justify-center px-4 pt-40">
      <div className="w-full max-w-lg bg-black/80 p-8 rounded-2xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center mb-6 text-red-500">🎟️ Book Your Slot</h2>

        {isSuccess && (
          <div className="bg-green-600 text-white p-4 mb-4 rounded-xl shadow-md text-center">
            ✅ Booking Successful! <br />
            Stadium: {stadium} <br />
            Time Slot: {form.timeSlot} <br />
            Name: {form.name}
          </div>
        )}
        {isError && <div className="bg-red-600 text-white p-4 mb-4 rounded-xl shadow-md text-center">❌ Please fill out all fields.</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Displaying the user's name instead of input */}
          <div className="w-full p-3 rounded-xl bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500">
            <label className="block text-sm font-semibold text-gray-300">Full Name</label>
            <p className="text-white mt-1">{form.name}</p> {/* Displaying user's name */}
          </div>

          {/* Displaying the user's email instead of input */}
          <div className="w-full p-3 rounded-xl bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500">
            <label className="block text-sm font-semibold text-gray-300">Email</label>
            <p className="text-white mt-1">{form.email}</p> {/* Displaying user's email */}
          </div>

          <input
            type="tel"
            name="phone"
            placeholder="+216 XX XXX XXX"
            value={form.phone}
            onChange={handleChange}
            pattern="\+216[0-9]{8}"
            className="w-full p-3 rounded-xl bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          <div className="w-full">
            <label className="text-sm font-semibold text-gray-300">Select a Date</label>
            <DatePicker
              selected={form.date}
              onChange={handleDateChange}
              className="w-full p-3 mt-2 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              dateFormat="dd/MM/yyyy"
              placeholderText="Select a date"
              minDate={new Date()} // 👈 disables all previous dates
              required
            />
          </div>

          {/* Disabled Time Slot Input */}
          <div>
            <label className="text-sm font-semibold text-gray-300">Selected Time Slot</label>
            <input
              type="text"
              name="timeSlot"
              value={form.timeSlot}
              onChange={handleChange}
              disabled
              className="w-full p-3 mt-2 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-xl text-white font-semibold transition duration-300"
          >
            ✅ Confirm Booking
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/profile" className="text-red-400 hover:text-red-600 underline">View Your Profile</Link>
        </div>
      </div>
    </div>
  );
};

export default Booking;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Booking = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    timeSlot: '',
    notes: '',
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🧠 Fetch user data from backend (simulate API call)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Simulated API call
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setForm({ ...form, date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.date || !form.timeSlot) {
      setIsError(true);
      return;
    }

    setIsSuccess(true);
    setIsError(false);

    // Here you would send the booking to your backend
    console.log('Booking form submitted:', form);
  };

  // ⏰ Updated and expanded evening time slots
  const timeSlots = [
    '9:00 AM - 11:00 AM',
    '11:00 AM - 1:00 PM',
    '1:00 PM - 3:00 PM',
    '3:00 PM - 5:00 PM',
    '5:00 PM - 7:00 PM',
    '7:00 PM - 9:00 PM',
    '9:00 PM - 11:00 PM',
  ];

  if (loading) return <div className="text-white text-center mt-20">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-800 text-white flex items-center justify-center px-4 pt-40">
      <div className="w-full max-w-lg bg-black p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6">Book Your Slot</h2>

        {isSuccess && <div className="bg-green-500 text-white p-4 mb-4 rounded">Booking Successful!</div>}
        {isError && <div className="bg-red-500 text-white p-4 mb-4 rounded">Please fill out all fields correctly.</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            placeholder="+216 XX XXX XXX"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
            pattern="\+216[0-9]{8}"
            required
          />

          {/* Date Picker */}
          <div className="w-full">
            <label className="text-sm font-medium">Select a Date</label>
            <DatePicker
              selected={form.date}
              onChange={handleDateChange}
              className="w-full p-3 mt-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              dateFormat="dd/MM/yyyy"
              placeholderText="Select a date"
              required
            />
          </div>

          {/* Time Slot */}
          <select
            name="timeSlot"
            value={form.timeSlot}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          >
            <option value="">Select Time Slot</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>

          {/* Notes */}
          <textarea
            name="notes"
            placeholder="Additional Notes"
            value={form.notes}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 rounded text-white font-semibold transition duration-300"
          >
            Confirm Booking
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/profile" className="text-red-400 hover:text-red-600">View Your Profile</Link>
        </div>
      </div>
    </div>
  );
};

export default Booking;

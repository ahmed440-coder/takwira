import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Make sure to import the styles

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
    console.log(form); // Normally, this would send the data to an API or backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-800 text-white flex items-center justify-center px-4">
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
            <option value="9:00 AM - 11:00 AM">9:00 AM - 11:00 AM</option>
            <option value="11:00 AM - 1:00 PM">11:00 AM - 1:00 PM</option>
            <option value="1:00 PM - 3:00 PM">1:00 PM - 3:00 PM</option>
            <option value="3:00 PM - 5:00 PM">3:00 PM - 5:00 PM</option>
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

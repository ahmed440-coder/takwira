import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const tunisianRegions = [
  "Ariana", "Béja", "Ben Arous", "Bizerte", "Gabès", "Gafsa", "Jendouba",
  "Kairouan", "Kasserine", "Kebili", "Kef", "Mahdia", "Manouba", "Medenine",
  "Monastir", "Nabeul", "Sfax", "Sidi Bouzid", "Siliana", "Sousse", "Tataouine",
  "Tozeur", "Tunis", "Zaghouan"
];

const timeSlots = [
  "6:00 AM - 7:30 AM", "7:30 AM - 9:00 AM", "9:00 AM - 10:30 AM",
  "10:30 AM - 12:00 PM", "12:00 PM - 1:30 PM", "1:30 PM - 3:00 PM",
  "3:00 PM - 4:30 PM", "4:30 PM - 6:00 PM", "6:00 PM - 7:30 PM",
  "7:30 PM - 9:00 PM", "9:00 PM - 10:30 PM", "10:30 PM - 12:00 AM",
];

function AddStadium() {
  const [stadiumName, setStadiumName] = useState('');
  const [region, setRegion] = useState('');
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

  const handleAddSlot = () => {
    if (selectedSlot && !slots.includes(selectedSlot)) {
      setSlots([...slots, selectedSlot]);
      setSelectedSlot('');
    }
  };

  const removeSlot = (index) => {
    setSlots(slots.filter((_, i) => i !== index));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files.map(file => URL.createObjectURL(file)));
    setCurrentImage(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ stadiumName, region, slots, images });
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-800 flex items-start justify-center p-6 pt-32 gap-8 flex-wrap">
      {/* Form Section */}
      <motion.div
        className="w-full max-w-md bg-black/70 p-8 rounded-3xl shadow-2xl border border-white/10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Add Your Stadium</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-300">Stadium Name</label>
            <input
              type="text"
              placeholder="Enter stadium name"
              value={stadiumName}
              onChange={(e) => setStadiumName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800/70 text-white border border-gray-600 focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-300">Location</label>
            <select
              className="w-full px-4 py-3 rounded-lg bg-gray-800/70 text-white border border-gray-600 focus:outline-none focus:border-red-500"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="" disabled>Select a region</option>
              {tunisianRegions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-300">Available Time Slots</label>
            <select
              className="w-full px-4 py-3 rounded-lg bg-gray-800/70 text-white border border-gray-600 focus:outline-none focus:border-red-500"
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
            >
              <option value="" disabled>Select a time slot</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>

            <button
              type="button"
              onClick={handleAddSlot}
              className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-full transition duration-300"
            >
              Add Slot
            </button>
          </div>

          <div className="mt-4">
            <label className="block mb-2 text-sm font-semibold text-gray-300">Selected Time Slots</label>
            <ul className="space-y-2 max-h-32 overflow-y-auto">
              {slots.map((slot, index) => (
                <li key={index} className="flex items-center justify-between text-sm text-gray-300">
                  {slot}
                  <button
                    type="button"
                    onClick={() => removeSlot(index)}
                    className="text-red-500 hover:text-red-600"
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-300">Upload Stadium Images</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-500 file:text-white hover:file:bg-red-600"
            />
          </div>

          <motion.button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-full transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Stadium
          </motion.button>

          <div className="text-center mt-4">
            <Link to="/" className="text-gray-300 hover:text-red-400 transition duration-300 text-sm">
              ← Back to Home
            </Link>
          </div>
        </form>
      </motion.div>

      {/* Preview Section */}
      <AnimatePresence>
        {(stadiumName || region || slots.length > 0 || images.length > 0) && (
          <motion.div
            className="w-full max-w-lg bg-black/70 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/10 text-white space-y-4"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-center">Preview</h2>

            {/* Image Carousel */}
            {images.length > 0 && (
              <div className="relative w-full h-60 rounded-lg overflow-hidden">
                <img
                  src={images[currentImage]}
                  alt="Stadium Preview"
                  className="object-cover w-full h-full"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full"
                >
                  ›
                </button>
                {/* Dots */}
                <div className="flex justify-center mt-2 space-x-2">
                  {images.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-2 w-2 rounded-full ${currentImage === idx ? 'bg-red-500' : 'bg-white/30'}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Stadium Details */}
            {stadiumName && <p><span className="font-semibold">Name:</span> {stadiumName}</p>}
            {region && <p><span className="font-semibold">Region:</span> {region}</p>}
            {slots.length > 0 && (
              <div>
                <p className="font-semibold">Available Slots:</p>
                <ul className="list-disc list-inside text-sm">
                  {slots.map((slot, i) => (
                    <li key={i}>{slot}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AddStadium;

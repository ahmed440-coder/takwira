import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// List of stadiums with images and additional details
const stadiums = [
  { name: 'Stadium A', image: '/path/to/stadium-a.jpg', region: 'Tunis', slots: ['10:00', '12:00', '14:00'], images: ['/path/to/stadium-a1.jpg', '/path/to/stadium-a2.jpg'] },
  { name: 'Stadium B', image: '/path/to/stadium-b.jpg', region: 'Sfax', slots: ['11:00', '13:00', '15:00'], images: ['/path/to/stadium-b1.jpg', '/path/to/stadium-b2.jpg'] },
  { name: 'Stadium C', image: '/path/to/stadium-c.jpg', region: 'Nabeul', slots: ['09:00', '11:30', '16:00'], images: ['/path/to/stadium-c1.jpg', '/path/to/stadium-c2.jpg'] },
];

const StadiumSelection = () => {
  const [selectedStadium, setSelectedStadium] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  const handleSelectStadium = (stadiumName) => {
    setSelectedStadium(stadiums.find(stadium => stadium.name === stadiumName)); // Find the selected stadium
  };

  const handleProceedToCalendar = () => {
    if (selectedStadium) {
      navigate(`/calendar?stadium=${selectedStadium.name}`);
    }
  };

  const nextImage = () => {
    if (selectedStadium.images.length > 1) {
      setCurrentImage((currentImage + 1) % selectedStadium.images.length);
    }
  };

  const prevImage = () => {
    if (selectedStadium.images.length > 1) {
      setCurrentImage((currentImage - 1 + selectedStadium.images.length) % selectedStadium.images.length);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white py-12 px-4 md:px-8 pt-40 flex justify-center items-center">
      <div className="max-w-7xl mx-auto space-y-10">
        <h1 className="text-5xl font-black text-red-500 tracking-tight mb-1 text-center">📅 Takwira</h1>
        <p className="text-gray-400 font-light text-md text-center">Sélectionnez un stade pour réserver votre créneau.</p>

        {/* Stadium Selection or Preview */}
        {selectedStadium ? (
          <AnimatePresence>
            {/* Display Stadium Preview */}
            <motion.div
              className="w-full max-w-lg bg-black/70 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/10 text-white space-y-4"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-center">Preview</h2>

              {/* Image Carousel */}
              {selectedStadium.images.length > 0 && (
                <div className="relative w-full h-60 rounded-lg overflow-hidden">
                  <img
                    src={selectedStadium.images[currentImage]}
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
                    {selectedStadium.images.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-2 w-2 rounded-full ${currentImage === idx ? 'bg-red-500' : 'bg-white/30'}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Stadium Details */}
              {selectedStadium.name && <p><span className="font-semibold">Name:</span> {selectedStadium.name}</p>}
              {selectedStadium.region && <p><span className="font-semibold">Region:</span> {selectedStadium.region}</p>}
              {selectedStadium.slots.length > 0 && (
                <div>
                  <p className="font-semibold">Available Slots:</p>
                  <ul className="list-disc list-inside text-sm">
                    {selectedStadium.slots.map((slot, i) => (
                      <li key={i}>{slot}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Button to proceed to the calendar */}
              <button
                onClick={handleProceedToCalendar}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl transition transform hover:scale-105"
              >
                Réserver ce stade
              </button>
            </motion.div>
          </AnimatePresence>
        ) : (
          // If no stadium is selected, show the stadium preview cards
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {stadiums.map((stadium) => (
              <div
                key={stadium.name}
                className="border rounded-xl overflow-hidden shadow-lg cursor-pointer hover:border-red-500"
                onClick={() => handleSelectStadium(stadium.name)} // Select stadium on click
              >
                <img
                  src={stadium.image}
                  alt={stadium.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-white">{stadium.name}</h3>
                  <p className="text-sm text-gray-400 mt-2">Cliquez pour sélectionner</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StadiumSelection;

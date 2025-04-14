import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section with Image */}
      <section className="relative flex flex-col items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('/path-to-your-hero-image.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay for text visibility */}
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold text-white mb-6 animate__animated animate__fadeIn">Welcome to Your Ultimate Football Experience</h1>
          <p className="text-lg text-white mb-8 animate__animated animate__fadeIn animate__delay-1s">
            Book your time slots, manage your profile, and access exclusive features.
          </p>
          <Link to="/booking" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
            Book Now
          </Link>
        </div>
      </section>

      {/* Features Section with Icons and Images */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold text-red-500 mb-8">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 ease-in-out">
              <img src="/path-to-your-icon1.png" alt="Real-Time Availability" className="mx-auto mb-4 w-16 h-16" />
              <h3 className="text-2xl font-bold text-white mb-4">Real-Time Availability</h3>
              <p className="text-lg text-gray-300">Check live availability and easily book your preferred time slot for football matches.</p>
            </div>
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 ease-in-out">
              <img src="/path-to-your-icon2.png" alt="Player Profiles" className="mx-auto mb-4 w-16 h-16" />
              <h3 className="text-2xl font-bold text-white mb-4">Detailed Player Profiles</h3>
              <p className="text-lg text-gray-300">Track your performance with win/loss stats, favorite positions, and more to improve your game.</p>
            </div>
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 ease-in-out">
              <img src="/path-to-your-icon3.png" alt="Easy Payment System" className="mx-auto mb-4 w-16 h-16" />
              <h3 className="text-2xl font-bold text-white mb-4">Easy Payment System</h3>
              <p className="text-lg text-gray-300">With our easy-to-use payment system, you can recharge credits or buy special offers in just a few clicks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stadium or Event Image Gallery */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold text-red-500 mb-8">Experience the Stadium</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <img src="/path-to-your-stadium-image1.jpg" alt="Stadium Image 1" className="w-full h-60 object-cover rounded-lg shadow-lg" />
            <img src="/path-to-your-stadium-image2.jpg" alt="Stadium Image 2" className="w-full h-60 object-cover rounded-lg shadow-lg" />
            <img src="/path-to-your-stadium-image3.jpg" alt="Stadium Image 3" className="w-full h-60 object-cover rounded-lg shadow-lg" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold text-red-500 mb-8">What Players Are Saying</h2>
          <div className="flex flex-wrap justify-center space-x-6">
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-xs">
              <p className="text-lg text-gray-300 mb-4">"The booking system is so easy, and I love that I can see live availability!"</p>
              <h4 className="text-white font-semibold">Ahmed R.</h4>
            </div>
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-xs">
              <p className="text-lg text-gray-300 mb-4">"I love checking my stats. It motivates me to play better every day!"</p>
              <h4 className="text-white font-semibold">Sarah K.</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-red-500 to-black text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-4">Ready to Play?</h2>
          <p className="text-lg mb-8">Join us today and start booking your matches instantly. Your football experience awaits!</p>
          <Link to="/booking" className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;

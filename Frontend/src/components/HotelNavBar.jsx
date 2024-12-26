import React, { useState } from 'react';

export const HotelNavBar = ({hotel}) => {
  const [isOpen, setIsOpen] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_URL;

  return (
    <nav className=" text-white w-full p-5">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <img src={`${BASE_URL}${hotel?.logo}`} alt="" className='w-20 h-20 rounded-full' />

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8">
          <li><a href="#home" className="hover:text-gray-300">Home</a></li>
          <li><a href="#about" className="hover:text-gray-300">About Us</a></li>
          <li><a href="#rooms" className="hover:text-gray-300">Rooms</a></li>
          <li><a href="#contact" className="hover:text-gray-300">Contact</a></li>
          <li><a href="/book-details" className="hover:text-gray-300">Booking Details</a></li>
        </ul>

        {/* Hamburger Icon */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <ul className="md:hidden bg-blue-500 space-y-4 py-4  rounded-lg">
          <li><a href="#home" className="block text-center hover:text-gray-300">Home</a></li>
          <li><a href="#about" className="block text-center hover:text-gray-300">About Us</a></li>
          <li><a href="#rooms" className="block text-center hover:text-gray-300">Rooms</a></li>
          <li><a href="#contact" className="block text-center hover:text-gray-300">Contact</a></li>
          <li><a href="/book-details" className="hover:text-gray-300">Booking Details</a></li>
        </ul>
      )}
    </nav>
  );
};

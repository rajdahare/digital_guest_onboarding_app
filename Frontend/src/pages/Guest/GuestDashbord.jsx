import Footer from '@/components/Footer';
import GuestForm from '@/components/GuestForm';
import { HotelNavBar } from '@/components/HotelNavBar';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getHotelDetails } from '../../api';

export const GuestDashbord = () => {
  const [showModal, setShowModal] = useState(false);
  const [hotel, setHotel] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = useCallback(async (id) => {
    try {
      const { data } = await getHotelDetails(id);
      setHotel(data);
    } catch (error) {
      console.error("Failed to fetch hotels", error);
    }
  }, []);

  const handleClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="guest-hero-container h-screen w-full">
        <div className="fixed lg:top-10 md:top-5 z-30 top-3 w-full">
          <HotelNavBar hotel={hotel} />
        </div>

        {/* Hotel Info Section */}
        {hotel && hotel.name && (
          <section className="bg-white bg-opacity-30 p-8 mt-10 mb-10 w-full">
            <div className="text-center max-w-screen-lg mx-auto">
              <h1 className="text-4xl font-extrabold text-gray-900">{hotel.name}</h1>
              {hotel.address && (
                <p className="text-xl text-gray-700 mt-4">{hotel.address}</p>
              )}
            </div>
          </section>
        )}

        {/* Book Now Button */}
        <div className="flex justify-center items-center">
          <button className="custom-button" onClick={handleClick}>
            Book Now
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md shadow-lg relative w-11/12 md:w-2/3 lg:w-1/2">
              <button
                onClick={closeModal}
                className="absolute top-2 text-2xl right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                &#10005;
              </button>
              <GuestForm id={id} closeModal={closeModal} />
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

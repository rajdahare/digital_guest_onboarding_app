import Footer from '@/components/Footer';
import { HotelNavBar } from '@/components/HotelNavBar';
import React, { useCallback, useEffect, useState } from 'react';
import { getBooking } from '../../api';

const BookingDetails = () => {
  const [hotel, setHotel] = useState(null);
  const id = localStorage.getItem('userId');

  useEffect(() => {
    if (id) {
      fetchBooking(id);
    }
  }, [id]);

  const fetchBooking = useCallback(async (id) => {
    try {
      const { data } = await getBooking(id);
      setHotel(data);
    } catch (error) {
      console.error('Failed to fetch booking', error);
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="guest-hero-container h-screen w-full">
        <div className="fixed lg:top-10 md:top-5 z-30 top-3 w-full">
          <HotelNavBar hotel={hotel} />
        </div>
        <div className="container mx-auto mt-20 p-5">
          {hotel ? (
            <div className="bg-white shadow rounded text-black p-5 print-area">
              <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
              <div className="mb-2">
                <strong>Name:</strong> {hotel.fullName}
              </div>
              <div className="mb-2">
                <strong>Mobile Number:</strong> {hotel.mobileNumber}
              </div>
              <div className="mb-2">
                <strong>Email:</strong> {hotel.email}
              </div>
              <div className="mb-2">
                <strong>Address:</strong> {hotel.address}
              </div>
              <div className="mb-2">
                <strong>ID Proof Number:</strong> {hotel.idProofNumber}
              </div>
              <div className="mb-2">
                <strong>Purpose of Visit:</strong> {hotel.purposeOfVisit}
              </div>
              <div className="mb-2">
                <strong>Stay Dates:</strong> From {new Date(hotel.stayDates.from).toLocaleDateString()} to {new Date(hotel.stayDates.to).toLocaleDateString()}
              </div>
              <div className="mb-2">
                <strong>Hotel Name:</strong> {hotel.hotelId.name}
              </div>
              <div className="mb-2">
                <strong>Hotel Address:</strong> {hotel.hotelId.address}
              </div>
              <div className="mt-5">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  Print
                </button>
              </div>
            </div>
          ) : (
            <p>Loading booking details...</p>
          )}
        </div>
      </div>
      <Footer />
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .print-area, .print-area * {
              visibility: visible;
            }
            .print-area {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
            }
          }
        `}
      </style>
    </>
  );
};

export default BookingDetails;

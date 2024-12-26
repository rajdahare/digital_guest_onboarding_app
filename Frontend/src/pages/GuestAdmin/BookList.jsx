import { fetchBookingByHotelId } from '@/api';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';

const BookList = () => {
  const { state: hotel } = useLocation();
  const [bookingDetails, setBookingDetails] = useState([]);
  const navigate = useNavigate()

  
  useEffect(() => {
    if (hotel && hotel.hotel._id) {
      fetchData(hotel.hotel._id);
    }
  }, [hotel]);

  const fetchData = useCallback(async (id) => {
    try {
      const respo = await fetchBookingByHotelId(id); 
      setBookingDetails(respo.data); 
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    }
  }, []);

  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const handleOnclick = () => {
    navigate(-1);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="h-[20px] bg-[#CEE4FD]"></div>
      <div className="container mx-auto p-6 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Details for {hotel?.hotel?.name}</h1>
          <p className="text-lg text-gray-600">{hotel?.hotel?.address}</p>
          <div className="mt-4">
            <img
              src={hotel?.hotel?.qrCodeURL}
              alt="QR Code"
              className="mx-auto w-24 h-24 object-contain"
            />
          </div>
        </div>
        <Button className="fixed right-5 top-40" onClick={handleOnclick}>Back</Button>

        {bookingDetails.length > 0 ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 px-5">
            {bookingDetails.map((booking) => (
              <Card key={booking._id} className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out">
                <CardHeader className="text-xl font-semibold text-gray-800 mb-2">{booking.fullName}</CardHeader>
                <CardContent className="text-sm text-gray-700 space-y-2">
                  <p className="text-gray-600">Mobile: <span className="font-medium text-gray-800">{booking.mobileNumber}</span></p>
                  <p className="text-gray-600">Email: <span className="font-medium text-gray-800">{booking.email}</span></p>
                  <p className="text-gray-600">Purpose of Visit: <span className="font-medium text-gray-800">{booking.purposeOfVisit}</span></p>
                  <p className="text-gray-600">Address: <span className="font-medium text-gray-800">{booking.address}</span></p>
                  <p className="text-gray-600">
                    Stay Dates: <span className="font-medium text-gray-800">{formatDate(booking.stayDates.from)} to {formatDate(booking.stayDates.to)}</span>
                  </p>
                  <p className="text-gray-600">ID Proof Number: <span className="font-medium text-gray-800">{booking.idProofNumber}</span></p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
           <div className='flex justify-center items-center content-center'>
            <p className="text-lg font-medium text-gray-700">No bookings found for this hotel.</p>
           </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BookList;

import React, { useEffect, useState, useRef, useCallback } from "react";
import { fetchHotels } from "../api";
import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";


const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <div className="text-white font-bold text-lg">
        <Link to="/" className="hover:text-gray-300">Home</Link>
      </div>
      <div className="text-white">
        <Link to="/login" className="hover:text-gray-300">Login</Link>
      </div>
    </nav>
  );
};


const HotelCard = () => {
  const [hotels, setHotels] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_URL;

  const pluginRef = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  const fetchData = useCallback(async () => {
    try {
      const { data } = await fetchHotels();
      setHotels(data);
    } catch (error) {
      console.error("Failed to fetch hotels", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <nav className="w-full bg-blue-500">
        <Navbar/>
        {/* <Link to="/">Home</Link> | <Link to="/login">Login</Link> */}
        
      </nav>
      <div className=" bg-[url('https://th.bing.com/th/id/OIP.-wcXcPg9mUaWmMJuoWXgHgHaE8?rs=1&pid=ImgDetMain')] bg-cover bg-center h-screen" >
        {hotels.length > 0 ? (
          <Carousel
            plugins={[pluginRef.current]}
            className="w-full max-w-6xl mx-auto"
            onMouseEnter={() => pluginRef.current.stop()}
            onMouseLeave={() => pluginRef.current.reset()}
          >
            <CarouselContent className="flex gap-6">
              {hotels.map((hotel) => (
                <CarouselItem
                  key={hotel.id}
                  className="flex-shrink-0 w-[calc(100%/3-1rem)] md:w-[calc(100%/3-1rem)] sm:w-[calc(100%/2-1rem)] p-4"
                >
                  <div className="border lg:mx-60 rounded-lg shadow-lg p-10 bg-white hover:bg-gray-100 transition duration-300 my-20" style={{ backgroundImage: `url(${BASE_URL}${hotel.logo})` }}>
                    <div className="flex flex-col items-center">
                      <img
                        src={`${BASE_URL}${hotel.logo}`}
                        alt={hotel.name}
                        className="h-24 w-24 object-cover rounded-full mb-4 border border-gray-300"
                      />
                      <h2 className="text-lg font-bold text-center">
                        {hotel.name}
                      </h2>
                      <p className="text-gray-600 text-center">
                        {hotel.address}
                      </p>
                    </div>
                    <div className="flex justify-center mt-6">
                      <img
                        src={hotel.qrCodeURL}
                        alt="QR Code"
                        className="h-24 w-24 rounded-lg border border-gray-300"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <div className="text-center text-gray-500 mt-10">
            No hotels available. Please try again later.
          </div>
        )}
      </div>
    </>
  );
};

export default HotelCard;

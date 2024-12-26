import { fetchHotels } from "@/api";
import React, { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const GuestHotelCard = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_URL;

  const fetchData = useCallback(async () => {
    try {
      const { data } = await fetchHotels(); // Assume this fetches the hotels data
      setHotels(data);
    } catch (error) {
      console.error("Failed to fetch hotels", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOnClick = (hotel) => {
    navigate(`/booking-list`, {
      replace: true,
      state: { hotel },
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {hotels.map((hotel) => (
        <Card key={hotel._id}>
          <CardHeader>
            {hotel.logo ? (
              <img
                src={`${BASE_URL}${hotel.logo}`}
                alt={`${hotel.name} Logo`}
                className="w-full h-32 object-cover rounded-t-md"
              />
            ) : (
              <div className="w-full h-32 bg-gray-300 rounded-t-md flex justify-center items-center">
                <span>No Logo</span>
              </div>
            )}
            <CardTitle>{hotel.name}</CardTitle>
            <CardDescription>{hotel.address}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>QR Code:</p>
            {hotel.qrCodeURL ? (
              <img
                src={hotel.qrCodeURL}
                alt="QR Code"
                className="w-20 h-20 object-contain"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-300 flex justify-center items-center">
                <span>No QR Code</span>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex-1 justify-center items-center content-center">
            <Button onClick={() => handleOnClick(hotel)}>SHOW GUEST LIST</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

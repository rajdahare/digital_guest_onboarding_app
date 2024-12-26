import HotelCard from '@/components/HotelCard';
import Navbar from '@/components/Navbar';
import React from 'react';
import { GuestHotelCard } from './GuestHotelCard';
import Footer from '@/components/Footer';

export const GuestAdminDashbord = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="h-[20px] bg-[#CEE4FD]"></div>
      <main className="flex-grow">
        <div className="my-8 px-5 md:px-20 lg:px-[10%]">
          <GuestHotelCard />
          <HotelCard />
        </div>
      </main>
      <footer className="relative w-full">
        <Footer />
      </footer>
    </div>
  );
};

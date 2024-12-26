import AdminPanel from '@/pages/Admin/AdminPanel'
import React from 'react'
import HotelCard from './HotelCard';

const HeroSection = () => {
  return (
    <div>
      <div className='h-[20px] bg-[#CEE4FD]'></div>
      <img src="https://www.fretbox.in/assets/img/hostel-management/bg1.png" alt="Hero Background" />
      
      <div className="lg:absolute lg:block hidden z-40 top-1/2 right-10 transform -translate-y-1/2 w-1/4 bg-stone-950 shadow-stone-700 rounded-lg shadow-lg">
        <AdminPanel />
      </div>
      <div className='lg:hidden'>
        <AdminPanel/>
      </div>

      <div className='my-40 px-5 md:px-20 lg:px-[10%]'>
        <h1 className='text-4xl font-semibold text-center my-4'>Our Branches</h1>
        
        {/* Modified Horizontal Rule (hr) */}
        <div className='h-[5px] rounded-md bg-[#CEE4FD] my-2'></div>
        
        
        <HotelCard/>
      </div>
    </div>
  )
}

export default HeroSection;

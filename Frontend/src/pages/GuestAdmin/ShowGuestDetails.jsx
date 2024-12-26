import { fetchHotels } from '@/api';
import React from 'react'

const ShowGuestDetails = () => {
    const fetchData = useCallback(async () => {
        try {
          const { data } = await fetchHotels();
          setHotels(data);
          setFilteredHotels(data);  // Initialize filteredHotels with all hotels
        } catch (error) {
          console.error("Failed to fetch hotels", error);
        }
      }, []);



  return (
    <div>ShowGuestDetails</div>
  )
}

export default ShowGuestDetails
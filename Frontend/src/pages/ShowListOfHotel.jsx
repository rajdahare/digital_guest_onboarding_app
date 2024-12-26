import React, { useState, useEffect, useCallback } from 'react';
import { deleteHotel, fetchHotels, updateHotel } from '../api';
import Swal from 'sweetalert2';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminPanel from './Admin/AdminPanel';

export const ShowListOfHotel = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hotelsPerPage] = useState(5);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [editModel, setEditModel] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL;

  // Fetch hotels data
  const fetchData = useCallback(async () => {
    try {
      const { data } = await fetchHotels();
      setHotels(data);
      setFilteredHotels(data);
    } catch (error) {
      console.error('Failed to fetch hotels:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle search filter
  useEffect(() => {
    const filtered = searchQuery
      ? hotels.filter((hotel) =>
          hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : hotels;
    setFilteredHotels(filtered);
  }, [searchQuery, hotels]);

  // Pagination logic
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = filteredHotels.slice(indexOfFirstHotel, indexOfLastHotel);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  
  const handleUpdate = async (hotel) => {

    console.log(hotel)
    
        setEditModel(true);
        setSelectedHotel(hotel);
        
      
  
  };

  // Handle hotel deletion
  const handleDelete = async (hotelId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this hotel?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteHotel(hotelId);
          setHotels(hotels.filter((hotel) => hotel._id !== hotelId));
          setFilteredHotels(filteredHotels.filter((hotel) => hotel._id !== hotelId));
          Swal.fire('Deleted!', 'The hotel has been deleted.', 'success');
        } catch (error) {
          console.error('Failed to delete hotel:', error);
          Swal.fire('Error!', 'Failed to delete the hotel.', 'error');
        }
      }
    });
  };

  return (
    <div className="bg-[#F2F8FB]">
      <Navbar />
      <div className="h-[20px] bg-[#CEE4FD]"></div>

      <div className="px-5 md:px-20 lg:px-[10%] h-screen flex-1 justify-center p-4 bg-white overflow-x-auto ">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search hotels..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-4 w-full"
        />

        {/* Hotels Table */}
        <table className="table-auto w-full  border-collapse border bg-stone-50 border-gray-400 rounded-lg">
          <thead className="bg-blue-200">
            <tr>
              <th className="border p-2">Hotel Name</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Logo</th>
              <th className="border p-2">QR Code</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentHotels.map((hotel) => (
              <tr key={hotel._id}>
                <td className="border p-2 text-center">{hotel.name}</td>
                <td className="border p-2 text-center">{hotel.address}</td>
                <td className="border p-2 text-center">
                  <img
                    src={`${BASE_URL}${hotel.logo}`}
                    alt={hotel.name}
                    className="w-12 h-12 rounded-full mx-auto"
                  />
                </td>
                <td className="border p-2 text-center">
                  <img
                    src={hotel.qrCodeURL}
                    alt="QR Code"
                    className="w-24 h-24 mx-auto"
                  />
                </td>
                <td className="border p-2 text-center flex justify-center items-center content-center gap-4">
                  <button
                    onClick={() => handleUpdate(hotel)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(hotel._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        
        {editModel && selectedHotel && (
           <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center ">
            <AdminPanel editModel={setEditModel} selectedHotel={selectedHotel} setSelectHotel={setSelectedHotel} />
           </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {Array.from(
            { length: Math.ceil(filteredHotels.length / hotelsPerPage) },
            (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`p-2 mx-1 ${
                  currentPage === index + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300'
                } rounded`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

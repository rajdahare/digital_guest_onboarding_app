import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { HomePage } from "./pages/Admin/HomePage";

import SignUp from "./pages/SignUp";
import './App.css'
import {ShowListOfHotel} from "./pages/ShowListOfHotel";
import { GuestAdminDashbord} from "./pages/GuestAdmin/GuestAdminDashbord";
import { GuestDashbord } from "./pages/Guest/GuestDashbord";
import  BookingDeteils  from "./pages/Guest/BookingDeteils";
import BookList from "./pages/GuestAdmin/BookList";
import HotelCard from "./components/HotelCard";


const App = () => (
  <>
  <Router>
   
    <Routes>
      <Route path="/" element={<HotelCard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/guest/:id" element={<GuestDashbord />} /> 
      <Route path="/Dashboard" element={<HomePage />} /> 
      <Route path="/list-of-hotels" element={<ShowListOfHotel />} />
      <Route path="/guest-Dashbord" element={<GuestAdminDashbord />} />
      <Route path="/book-details" element={<BookingDeteils />} />
      <Route path="/booking-list" element={<BookList />} />

    </Routes>
  </Router>
  </>
);

export default App;

const Guest = require("../models/Guest");

// Register a guest
exports.registerGuest = async (req, res) => {
  try {
    const { fullName, mobileNumber, address, purposeOfVisit, stayDates, email, idProofNumber, hotelId } = req.body;
    const newGuest = new Guest({
      fullName,
      mobileNumber,
      address,
      purposeOfVisit,
      stayDates,
      email,
      idProofNumber,
      hotelId,
    });
    await newGuest.save();
    res.status(201).json({ message: "Guest registered successfully", guest: newGuest });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get guests by hotel
exports.getGuestsByHotel = async (req, res) => {
  try {
    const guests = await Guest.find({ hotelId: req.params.hotelId });
    res.status(200).json(guests);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get a guest by ID

// Get a guest by ID

exports.getGuestById = async (req, res) => {
 const id = req.params.id;

 if(id){
   try{
     const guest = await Guest.findById(id).populate("hotelId");
     
     if(!guest){
       return res.status(404).json({message: "Guest not found"});
     }
     res.status(200).json(guest);
   }catch(err){
     res.status(500).json({message: "Server error", error: err.message});
   }
 }
 else{
   res.status(400).json({message: "Invalid ID"});
 }



};



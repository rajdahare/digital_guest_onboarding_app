const Hotel = require("../models/Hotel");
const QRCode = require("qrcode");

const FRONTEND_URL= "https://digital-guest-onboarding-system-1.onrender.com"
exports.addHotel = async (req, res) => {
  try {
    const { name, address } = req.body;
    const logo = req.file ? `/uploads/${req.file.filename}` : null;
    const newHotel = new Hotel({ name, address, logo });
    await newHotel.save(); 
   
    const qrCodeURL = await QRCode.toDataURL(`${FRONTEND_URL}/guest/${newHotel._id}`);
    newHotel.qrCodeURL = qrCodeURL; 

    
    await newHotel.save();

    res.status(201).json(newHotel);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// Update a hotel
exports.updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address } = req.body;
    const logo = req.file ? `/uploads/${req.file.filename}` : undefined; // Only update logo if a new file is uploaded

    const updatedData = { name, address };
    if (logo) updatedData.logo = logo; // Add logo to update if provided

    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true, runValidators: true } // Return the updated document and validate input
    );

    if (!updatedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    if (name || address) {
      // Generate new QR code URL after updating the hotel
      const qrCodeURL = await QRCode.toDataURL(`${FRONTEND_URL}/guest/${updatedHotel._id}`);
      updatedHotel.qrCodeURL = qrCodeURL; // Set the qrCodeURL field
      await updatedHotel.save();
    }

    res.status(200).json(updatedHotel);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedHotel = await Hotel.findByIdAndDelete(id);

    if (!deletedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json({ message: "Hotel deleted successfully", hotel: deletedHotel });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

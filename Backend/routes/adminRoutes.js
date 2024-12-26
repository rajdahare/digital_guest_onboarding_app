const express = require("express");
const router = express.Router();
const multer = require("multer");
const { addHotel, getHotels,getHotelById, updateHotel, deleteHotel } = require("../controllers/adminController");

// Multer setup for file upload
const upload = multer({ dest: "uploads/" });

router.post("/hotels", upload.single("logo"), addHotel);
router.get("/hotels", getHotels);

router.get("/hotels/:id", getHotelById);

router.put("/hotels/:id", upload.single("logo"), updateHotel);

router.delete("/hotels/:id", deleteHotel);


module.exports = router;

const express = require("express");
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const { registerGuest, getGuestsByHotel,getGuestById } = require("../controllers/guestController");

router.post("/register", registerGuest);
router.get("/hotel/:hotelId", getGuestsByHotel);

router.get("/:id", authenticate, getGuestById);



module.exports = router;

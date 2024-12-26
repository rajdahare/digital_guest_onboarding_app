
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



exports.signup = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Validate required fields
    if (!username || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for unique username
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Validate role
    const validRoles = ["MainAdmin", "GuestAdmin"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Create new user
    const newUser = new User({ username, password, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
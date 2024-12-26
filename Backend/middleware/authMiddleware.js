const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.admin = verified; // Main Admin or Guest Admin Data
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

module.exports = authenticate;

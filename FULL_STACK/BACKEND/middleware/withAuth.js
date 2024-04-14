const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
 
dotenv.config();

exports.withAuthUser = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  if (token.startsWith("Bearer ")) {
    // Check if it's a Bearer token
    // Remove 'Bearer ' to get the actual token
    token = token.slice(7, token.length);
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    } else {
      req.userId = decoded.userId;
      next();
    }
  });
};

//admin withAuth

exports.withAuthAdmin = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  if (token.startsWith("Bearer ")) {
    // Check if it's a Bearer token
    // Remove 'Bearer ' to get the actual token
    token = token.slice(7, token.length);
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    } else {
      req.adminId = decoded.adminId;
      next();
    }
  });
};

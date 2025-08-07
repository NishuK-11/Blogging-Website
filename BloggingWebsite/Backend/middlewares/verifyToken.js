import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js'; // Make sure to import your user model

const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    // Fetch the user to check if they are admin
    const user = await UserModel.findById(decoded.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }
    console.log(user);
    // Attach user to request for use in controller (optional)
    req.user = user;

    next(); // ✅ Allow next middleware/controller to run

  } catch (error) {
    console.error("Middleware error:", error);
    return res.status(401).json({ message: "Invalid token or session expired" });
  }
};

export default isAdmin;

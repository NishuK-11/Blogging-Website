import UserModel from "../models/user.js";
import jwt from "jsonwebtoken";
import bcryptjs from 'bcryptjs';
import cookieParser from "cookie-parser";

const register = async (req, res) => {
  try {
    const { name, email, password ,role} = req.body;

    const exitsUser = await UserModel.findOne({ email });
    if (exitsUser) {
      return res.status(401).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      role,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      newUser,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials, please register",
      });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // change to true in production with HTTPS
      maxAge: 360000000, // 1 hour
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
      token
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const Logout = async(req,res)=>{
    try{
        res.clearCookie('token')
        res.status(200).json({message:"user logout successfully"})
    }catch (error) {
     res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export {register, login,Logout}
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { jsonRes, sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.middleware.js";

// User Home
export const userHome = (req, res) => {
  res.send("<h1>Wellcome <h1/>");
};

// Get All Users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    console.log(req.query);

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log("😣 check Users", error);
    return next(new ErrorHandler(500));
  }
};

// Register User
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return jsonRes(res, 404, false, "User Already Exist");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });
    sendCookie(user, res, 201, "Registered Successfully");
  } catch (error) {
    console.log("😣 check User Register", error);
    return next(new ErrorHandler(500));
  }
};

// Login User
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler(404, "Invalid Email or Password"));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ErrorHandler(404, "Invalid Password"));
    }
    sendCookie(user, res, 200, `Welcome Back ${user.name}`);
  } catch (error) {
    console.log("😣 check User Login", error);
    return next(new ErrorHandler(500));
  }
};

// Logout User
export const logout = (req, res, next) => {
  try {
    
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({
        success: true,
        user: {},
      });
  } catch (error) {
    console.log("😣 check user Logout ", error);
    return next(new ErrorHandler(500));
  }
};

// User Detail
export const getUserDetail = (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.log("😣 check User Detail  ", error);
    return next(new ErrorHandler(500));
  }
};

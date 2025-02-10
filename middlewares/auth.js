import jsonwebtoken from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { jsonRes } from "../utils/features.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return jsonRes(res, 404, false, "Login First");
    }
    const decode = jsonwebtoken.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decode._id);
    next();
  } catch (error) {
    console.log("😣 check /userid ", error);
  }
};

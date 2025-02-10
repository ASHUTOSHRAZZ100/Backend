import express from "express";
import {
  getAllUsers,
  getUserDetail,
  register,
  userHome,
  login,
  logout,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

export const router = express.Router();

router.get("/", userHome);

// router.get("/all", getAllUsers);

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

// router.get("/:id", getByIDUser);
// router.put("/:id", updateByIDUser);
// router.delete("/:id", deleteByIDUser);

router
  .get("/me",isAuthenticated,getUserDetail)


export default router;

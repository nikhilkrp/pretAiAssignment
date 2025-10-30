import express from "express";
import {
  getProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/profileController.js";
import authUser from "../middleware/authUser.js";

const router = express.Router();

router.get("/me", authUser, getProfile);
router.put("/", authUser, updateProfile);
router.delete("/", authUser, deleteProfile);

export default router;

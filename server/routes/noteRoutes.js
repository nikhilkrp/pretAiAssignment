import express from "express";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote
} from "../controllers/noteController.js";
import authUser from "../middleware/authUser.js";

const router = express.Router();

router.get("/", authUser, getNotes);
router.post("/", authUser, createNote);
router.put("/:id", authUser, updateNote);
router.delete("/:id", authUser, deleteNote);

export default router;

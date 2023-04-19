import express from "express";
const router = express.Router();

import {
  getAllEvents,
  createEvent,
  getEventById,
  updateEventById,
  deleteEventById,
} from "../controllers/eventControllers.js";

import imageUpload from "../middleware/imageUpload.js";

// get all events
router.get("/", getAllEvents);

// create a new event
router.post("/", imageUpload,createEvent);

// get a specific event by ID
router.get("/:id", getEventById);

// update a specific event by ID
router.patch("/:id",imageUpload, updateEventById);

// delete an event by ID
router.delete("/:id",imageUpload, deleteEventById);

export default router;

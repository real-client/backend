import express from "express";
const router = express.Router();

import {
  getAllEvents,
  createEvent,
  getEvent,
  updateEventById,
  deleteEventById,
} from "../controllers/eventControllers.js";

import imageUpload from "../middleware/imageUpload.js";

// get all events
router.get("/", getAllEvents);

// create a new event
router.post("/",createEvent);

// get a specific event by ID
router.get("/:id", getEvent);

// update a specific event by ID
router.patch("/:id", updateEventById);

// delete an event by ID
router.delete("/:id", deleteEventById);

export default router;

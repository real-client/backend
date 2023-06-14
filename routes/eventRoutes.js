import express from "express";
const router = express.Router();

import {
  getAllEvents,
  createEvent,
  getEventById,
  updateEventById,
  deleteEventById,
  getLatestEvents,
  getPaginatedEvents,
} from "../controllers/eventControllers.js";

import imageUpload from "../middleware/imageUpload.js";

// get all events
router.get("/", getAllEvents);

router.get("/sortedbydate", getPaginatedEvents);

//get latest events
router.get("/latest", getLatestEvents);

// create a new event
router.post("/", imageUpload, createEvent);

// get a specific event by ID
router.get("/:id", getEventById);

// update a specific event by ID
router.patch("/:id", imageUpload, updateEventById);

// delete an event by ID
router.delete("/:id", deleteEventById);

export default router;

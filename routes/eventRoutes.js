import express from "express";
const router = express.Router();

import {
  getAllEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
  getLatestEvents,
  getPaginatedEvents,
  getPaginatedPopulatedEvents,
} from "../controllers/eventControllers.js";

import imageUpload from "../middleware/filesUpload.js";


// get all events
router.get("/", getAllEvents);

router.get("/sortedbydate", getPaginatedEvents);

//get latest events
router.get("/latest", getLatestEvents);

//Get paginated events populated with user data
router.get("/users", getPaginatedPopulatedEvents);

// create a new event
router.post("/", imageUpload, createEvent);

// get a specific event by ID
router.get("/:id", getEventById);

// update a specific event by ID
router.patch("/:id", imageUpload, updateEvent);

// delete an event by ID
router.delete("/:id", deleteEvent);

export default router;

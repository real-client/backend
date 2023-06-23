import express from "express";
const router = express.Router();
import imageUpload from "../middleware/filesUpload.js";

import {
  createVolunteer,
  getAllVolunteers,
  getVolunteerByID,
  updateVolunteer,
  deleteVolunteer,
} from "../controllers/volunteersControllers.js";

// Create a new volunteer
router.post("/", imageUpload, createVolunteer);

// Get all Volunteers
router.get("/", getAllVolunteers);

// Get a single Volunteer by ID
router.get("/:id", getVolunteerByID);

// Update an existing Volunteer by ID
router.patch("/:id", imageUpload, updateVolunteer);

// Delete a Volunteer by ID
router.delete("/:id", deleteVolunteer);

export default router;

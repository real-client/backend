import express from "express";
const router = express.Router();

import {
  createTeamMember,
  getAllTeams,
  getTeamMemberByID,
  updateTeamMember,
  deleteTeamMember,
} from "../controllers/teamControllers.js";
import imageUpload from "../middleware/filesUpload.js";

// Create a new team
router.post("/", imageUpload, createTeamMember);

// Get all teams
router.get("/", getAllTeams);

// Get a single team by ID
router.get("/:id", getTeamMemberByID);

// Update an existing team by ID
router.patch("/:id", imageUpload, updateTeamMember);

// Delete a team by ID
router.delete("/:id", deleteTeamMember);

export default router;

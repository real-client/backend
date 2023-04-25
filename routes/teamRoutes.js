import express from "express";
const router = express.Router();
import {createTeam ,getAllTeams, getTeamByID, updateTeam, deleteTeam}  from "../controllers/teamControllers.js"
import imageUpload from "../middleware/imageUpload.js";

// Create a new team
router.post('/',imageUpload, createTeam);

// Get all teams
router.get('/', getAllTeams);

// Get a single team by ID
router.get('/:id', getTeamByID);

// Update an existing team by ID
router.put('/:id',imageUpload, updateTeam);

// Delete a team by ID
router.delete('/:id', deleteTeam);

export default router;
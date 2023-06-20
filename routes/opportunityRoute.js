import express from "express";
const router = express.Router();
import {
  createOpportunity,
  getAllOpportunity,
  getOpportunityByID,
  getPaginatedOpportunities,
  getPaginatedPopulatedOpportunities,
  updateOpportunity,
  deleteOpportunity,
} from "../controllers/opportunityController.js";

import imageUpload from "../middleware/filesUpload.js";

// add a new Opportunity
router.post("/", imageUpload, createOpportunity);

// Get all Opportunity
router.get("/", getAllOpportunity);

// Get paginated Opportunities
router.get("/sortedbydate", getPaginatedOpportunities);

// Get paginated Opportunities populated with users data
router.get("/users", getPaginatedPopulatedOpportunities);

// Get Opportunity by ID
router.get("/:id", getOpportunityByID);

// Update an existing Opportunity by ID
router.patch("/:id", imageUpload, updateOpportunity);

// Delete a Opportunity by ID
router.delete("/:id", deleteOpportunity);

export default router;

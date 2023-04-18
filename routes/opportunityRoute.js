import express from "express";
const router = express.Router();
import {
  AddOpportunity,
  getAllOpportunity,
  getOpportunityByID,
  updateOpportunity,
  deleteOpportunity,
} from "../controllers/opportunityController.js";

// add a new Opportunity
router.post("/add", AddOpportunity);

// Get all Opportunity
router.get("/", getAllOpportunity);

// Get Opportunity by ID
router.get("/:id", getOpportunityByID);

// Update an existing Opportunity by ID
router.put("/:id", updateOpportunity);

// Delete a Opportunity by ID
router.delete("/:id", deleteOpportunity);

export default router;

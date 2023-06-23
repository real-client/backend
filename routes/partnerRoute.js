import express from "express";
const router = express.Router();
import imageUpload from "../middleware/filesUpload.js";
import {
  createPartner,
  getAllPartner,
  getPartnerByID,
  updatePartner,
  deletePartner,
} from "../controllers/partnerController.js";

// add a new partner
router.post("/", imageUpload, createPartner);

// Get all partner
router.get("/", getAllPartner);

// Get partner by ID
router.get("/:id", getPartnerByID);

// Update an existing partner by ID
router.patch("/:id", imageUpload, updatePartner);

// Delete a partner by ID
router.delete("/:id", deletePartner);

export default router;

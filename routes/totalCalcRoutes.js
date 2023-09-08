import express from "express";
const router = express.Router();

import { getAllCalculations } from "../controllers/totalCalcControllers.js";

// get all events
router.get("/", getAllCalculations);

export default router;

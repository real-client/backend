import express from "express";
const router = express.Router();

import {
  createVacancy,
  getAllVacancies,
  getPaginatedVacancies,
  getFilteredPaginatedVacancies,
  getVacancyById,
  updateVacancy,
  deleteVacancy
} from "../controllers/vacancyController.js";

// get all vacancies
router.get("/", getAllVacancies);

// get paginated vacancies
router.get("/paginated", getPaginatedVacancies);

// get paginated filtered vacancies
router.get("/filter", getFilteredPaginatedVacancies);

// create a new event
router.post("/", createVacancy);

// get vacancy by Id
router.get("/:id", getVacancyById)

// update vacancy
router.patch("/:id", updateVacancy)

// delete vacancy
router.delete("/:id", deleteVacancy);

export default router;

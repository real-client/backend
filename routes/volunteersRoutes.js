import express from 'express';
import {createVolunteer, getAllVolunteers, getVolunteerByID, updateVolunteer, deleteVolunteer} from '../controllers/volunteersControllers.js';

const router = express.router();

// Create a new volunteer
router.post('/', createVolunteer);

// Get all Volunteers
router.get('/', getAllVolunteers);

// Get a single Volunteer by ID
router.get('/:id', getVolunteerByID);

// Update an existing Volunteer by ID
router.put('/:id', updateVolunteer);

// Delete a Volunteer by ID
router.delete('/:id', deleteVolunteer);

export default router;

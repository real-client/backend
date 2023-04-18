import express from 'express';
const router =  express.Router();
import {AddPartner ,getAllPartner, getPartnerByID, updatePartner, deletePartner}  from "../controllers/partnerController.js"



// add a new partner
router.post('/add', AddPartner);

// Get all partner
router.get('/', getAllPartner);

// Get partner by ID
router.get('/:id', getPartnerByID);

// Update an existing partner by ID
router.put('/:id', updatePartner);

// Delete a partner by ID
router.delete('/:id', deletePartner);

export default router;
import express from 'express';
import { getPlaces, createPlace } from '../controllers/placesController.js';
import upload from '../middleware/multer.js';

const router = express.Router();

// GET /api/places - Retrieve all listings
router.get('/', getPlaces);

// POST /api/places - Create a new listing (intercepts 'images' with Multer)
router.post('/', upload.array('images', 5), createPlace);

export default router;

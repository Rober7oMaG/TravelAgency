import express from 'express';
import {homePage, aboutPage, tripsPage, tripDetailPage, testimonialsPage} from '../controllers/PagesController.js';
import {saveTestimonial} from '../controllers/TestimonialController.js';

const router = express.Router();

router.get('/', homePage);

router.get('/about', aboutPage);

router.get('/trips', tripsPage);

router.get('/trips/:slug', tripDetailPage);

router.get('/testimonials', testimonialsPage);
router.post('/testimonials', saveTestimonial);

export default router;
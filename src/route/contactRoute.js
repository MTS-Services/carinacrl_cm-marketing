const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactController');

// POST /api/contact/consultation — main contact form (image 1)
router.post('/consultation', contactController.handleConsultation);

// POST /api/contact/strategy-call — popup form (image 2)
router.post('/strategy-call', contactController.handleStrategyCall);

module.exports = router;

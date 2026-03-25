/**
 * Volunteer Routes
 * Mounts volunteer registration endpoints.
 */

const express = require('express');
const router = express.Router();

const { validateVolunteerRegistration } = require('../middleware/validate.middleware');
const { registerVolunteer } = require('../controllers/volunteer.controller');

// POST /api/volunteer — Register a new volunteer
router.post('/', validateVolunteerRegistration, registerVolunteer);

module.exports = router;

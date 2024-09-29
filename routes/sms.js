const express = require('express');
const router = express.Router();
const path = require('path'); // Import path module
const smsController = require('../backend/controllers/smsController');

// Existing route for sending SMS
router.post('/send', smsController.sendSMS);

// New route for locating the phone
router.post('/locate', (req, res) => {
    const currentPath = path.resolve('.');
    res.json({ response: `Locating your phone... Current path: ${currentPath}` });
});

// New route for retrieving contacts
router.post('/contacts', (req, res) => {
    const currentPath = path.resolve('.');
    res.json({ response: `Retrieving your contacts... Current path: ${currentPath}` });
});

// New route for changing sound profile
router.post('/sound', (req, res) => {
    const profile = req.body.profile; // Expecting { "profile": "silent" }
    res.json({ response: `Changing sound profile to ${profile}...` });
});

// New route for locking the phone
router.post('/lock', (req, res) => {
    res.json({ response: 'Locking your phone...' });
});

// New route for unlocking the phone
router.post('/unlock', (req, res) => {
    res.json({ response: 'Unlocking your phone...' });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/register', controller.registerUser);
router.post('/preferences', controller.addOrUpdatePreferences);

module.exports = router;

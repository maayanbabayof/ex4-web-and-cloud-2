const express = require('express');
const { getVacationTypes, getDestinations, createVacation, getAllVacations } = require('../controller/vacationsController');
const router = express.Router();

router.use(express.json());

router.get('/types', getVacationTypes);
router.get('/destinations', getDestinations);
router.post('/create', createVacation);
router.get('/all', getAllVacations);

module.exports = router;

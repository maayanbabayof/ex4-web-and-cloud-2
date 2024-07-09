const express = require('express');
const { createUser, getAllUsers, loginUser, logoutUser } = require('../controller/usersController');
const router = express.Router();

router.use(express.json());

router.post('/create', createUser);
router.get('/all', getAllUsers);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

module.exports = router;

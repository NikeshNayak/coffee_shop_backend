const express = require('express');

const controller = require('../../controllers/app/auth.controller');

const router = express.Router();

router.post('/login', controller.login);
router.post('/changepassword', controller.changePassword);
router.post('/signup', controller.signUp);

module.exports = router;
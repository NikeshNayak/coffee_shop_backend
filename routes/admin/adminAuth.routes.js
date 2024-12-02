const express = require('express');

const controller = require('../../controllers/admin/adminAuth.controller');

const router = express.Router();

router.post('/login', controller.adminLogin);
router.post('/changepassword', controller.changePassword);
router.post('/signup', controller.adminSignUp);

module.exports = router;
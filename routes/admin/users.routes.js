
const express = require('express');
const upload = require("../../middleware/multerConfig");

const controller = require('../../controllers/admin/users.controller');

const router = express.Router();

router.get("/getuserdetails/:id", controller.getUserDetails);
router.get("/getuserslist", controller.getUsersList);
router.get("/deleteuser/:id", controller.deleteUser);

module.exports = router;
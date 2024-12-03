
const express = require('express');

const controller = require('../../controllers/app/product.controller');

const router = express.Router();

router.get("/getallproductlist", controller.getAllProductList);
router.get("/getproductbyid/:productId", controller.getProductById);

module.exports = router;
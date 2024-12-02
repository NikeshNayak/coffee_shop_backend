
const express = require('express');
const upload = require("../../middleware/multerConfig");

const controller = require('../../controllers/admin/product.controller');

const router = express.Router();

router.post('/addproduct', upload.single("image"), controller.addProduct);
router.post("/updateproduct/:id", upload.single("image"), controller.updateProduct);
router.get("/getproductdetails/:id", controller.getProductDetails);
router.get("/getproductlist", controller.getProductList);

module.exports = router;
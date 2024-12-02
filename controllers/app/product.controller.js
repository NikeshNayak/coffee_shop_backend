const Product = require("../../models/product.model");

// Get All Products for Users
exports.getAllProductList = async (req, res, next) => {
  try {

    // Fetch all products based on the filter
    const products = await Product.find(); // Sort by latest created

    if (!products.length) {
      return res.status(404).send({
        code: 404,
        success: false,
        message: "No products found",
      });
    }

    return res.status(200).send({
      code: 200,
      success: true,
      products,
      message: "All products fetched successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      code: 500,
      success: false,
      message: "An error occurred while fetching products",
    });
  }
};

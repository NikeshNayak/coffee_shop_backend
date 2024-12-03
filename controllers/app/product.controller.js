const Product = require("../../models/product.model");

// Get All Products for Users
exports.getAllProductList = async (req, res, next) => {
  try {
    const { search } = req.query;

    // Fetch all products based on the filter
    const products = await Product.find().sort({ createdAt: -1 }); // Sort by latest created

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

// Get a Single Product by productId
exports.getProductById = async (req, res, next) => {
  try {
    const { productId } = req.params;  // Get productId from URL parameters

    // Validate if productId is provided
    if (!productId) {
      return res.status(400).send({
        code: 400,
        success: false,
        message: "Product ID is required",
      });
    }

    // Fetch the product by its ID
    const product = await Product.findById(productId);

    // Check if the product exists
    if (!product) {
      return res.status(404).send({
        code: 404,
        success: false,
        message: "Product not found",
      });
    }

    // Return the product
    return res.status(200).send({
      code: 200,
      success: true,
      product,
      message: "Product fetched successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      code: 500,
      success: false,
      message: "An error occurred while fetching the product",
    });
  }
};

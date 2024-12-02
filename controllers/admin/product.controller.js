const Product = require("../../models/product.model");
const path = require("path");
const fs = require("fs");

// Add Product with Image Upload
exports.addProduct = async (req, res, next) => {
  try {
    // Extract fields from request body
    const {
      title,
      subtitle,
      price,
      type,
      subType,
      isMilkAdded,
      description,
      sizes,
    } = req.body;

    // Extract uploaded image
    const image = req.file
      ? path.join("uploads/images", req.file.filename)
      : null;

    // Validate required parameters
    if (
      !title ||
      !subtitle ||
      !image ||
      !price ||
      !type ||
      !subType ||
      isMilkAdded === undefined ||
      !description ||
      !sizes
    ) {
      return res.status(422).send({
        code: 422,
        success: false,
        message: "Required parameters missing !!",
      });
    }

    // Create new product
    let newProduct = await Product.create({
      title,
      subtitle,
      image,
      price,
      type,
      subType,
      isMilkAdded,
      description,
      sizes: sizes.split(","),
    });

    return res.status(200).send({
      code: 200,
      success: true,
      product: newProduct,
      message: "Product added successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      code: 500,
      success: false,
      message: "An error occurred while adding the product",
    });
  }
};

// Update Product
exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params; // Product ID from request parameters
    const { title, subtitle, price, type, subType, isMilkAdded, description, sizes } = req.body;

    // Check if product exists
    let product = await Product.findById(id);
    if (!product) {
      return res.status(404).send({
        code: 404,
        success: false,
        message: "Product not found",
      });
    }

    // Handle new image upload
    const image = req.file ? path.join("uploads/images", req.file.filename) : null;

    // Update fields if provided
    const updatedData = {
      ...(title && { title }),
      ...(subtitle && { subtitle }),
      ...(image && { image }), // Only update image if new one is uploaded
      ...(price && { price }),
      ...(type && { type }),
      ...(subType && { subType }),
      ...(isMilkAdded !== undefined && { isMilkAdded }),
      ...(description && { description }),
      ...(sizes && { sizes: sizes.split(",") }),
    };

    // Remove old image if a new one is uploaded
    if (image && product.image) {
      fs.unlink(product.image, (err) => {
        if (err) console.error("Error removing old image:", err);
      });
    }

    // Update product in the database
    let updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });

    return res.status(200).send({
      code: 200,
      success: true,
      product: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      code: 500,
      success: false,
      message: "An error occurred while updating the product",
    });
  }
};

// Get Product Details by ID
exports.getProductDetails = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      // Validate if the product exists
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).send({
          code: 404,
          success: false,
          message: "Product not found",
        });
      }
  
      return res.status(200).send({
        code: 200,
        success: true,
        product,
        message: "Product details fetched successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        code: 500,
        success: false,
        message: "An error occurred while fetching product details",
      });
    }
  };

  // Get Product List
exports.getProductList = async (req, res, next) => {
    try {
      const { page = 1, limit = 10, type, subType, search } = req.query;
  
      // Build the filter query dynamically
      const filter = {};
      if (type) filter.type = type;
      if (subType) filter.subType = subType;
      if (search) {
        filter.title = { $regex: search, $options: "i" }; // Case-insensitive search in the title
      }
  
      // Fetch products with pagination
      const products = await Product.find(filter)
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 }); // Sort by latest created
  
      // Get total count for pagination
      const totalProducts = await Product.countDocuments(filter);
  
      return res.status(200).send({
        code: 200,
        success: true,
        products,
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: parseInt(page),
        message: "Product list fetched successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        code: 500,
        success: false,
        message: "An error occurred while fetching product list",
      });
    }
  };
  

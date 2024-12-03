const AppUsers = require("../../models/appUsers.model");

// Get Users List
exports.getUsersList = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search } = req.query;

    // Build the filter query dynamically
    const filter = {};
    if (search) {
      filter.title = { $regex: search, $options: "i" }; // Case-insensitive search in the title
    }

    // Fetch users with pagination
    const users = await AppUsers.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 }); // Sort by latest created

    // Get total count for pagination
    const totalUsers = await AppUsers.countDocuments(filter);

    return res.status(200).send({
      code: 200,
      success: true,
      users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: parseInt(page),
      message: "Users list fetched successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      code: 500,
      success: false,
      message: "An error occurred while fetching users list",
    });
  }
};

// Get User Details by ID
exports.getUserDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate if the user exists
    const user = await AppUsers.findById(id);
    if (!user) {
      return res.status(404).send({
        code: 404,
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      code: 200,
      success: true,
      user,
      message: "User details fetched successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      code: 500,
      success: false,
      message: "An error occurred while fetching user details",
    });
  }
};

// Delete User by ID
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate if the user exists
    const user = await AppUsers.findById(id);
    if (!user) {
      return res.status(404).send({
        code: 404,
        success: false,
        message: "User not found",
      });
    }

    // Delete the user
    await AppUsers.findByIdAndDelete(id);

    return res.status(200).send({
      code: 200,
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).send({
      code: 500,
      success: false,
      message: "An error occurred while deleting the user",
    });
  }
};

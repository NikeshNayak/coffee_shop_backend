const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const AppUsers = require("../../models/appUsers.model");

exports.login = async (req, res, next) => {
  try {
    let result = await AppUsers.findOne({
      emailId: req.body.emailId,
      password: req.body.password,
    });
    if (result != null) {
      const data = JSON.parse(JSON.stringify(result));
      var token = jwt.sign({ id: data["_id"] }, process.env.SECRETKEY);

      // Combine staff details with their permissions
      const userDetails = {
        ...data,
      };
      return res.status(200).send({
        code: 200,
        success: true,
        userDetails: userDetails,
        accessToken: token,
        message: "Login Successfully",
      });
    }
    return res.status(400).send({
      code: 400,
      success: false,
      message: "Login Failed !!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      code: 500,
      success: false,
      message: "An error occurred",
    });
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(422).send({
        code: 422,
        success: false,
        message: "Require parameters missing !!",
      });
    }

    let result = await AppUsers.findByIdAndUpdate(
      userId,
      {
        password: req.body.newPassword,
      },
      {
        new: true,
      }
    );
    if (result != null) {
      return res.status(200).send({
        code: 200,
        success: true,
        message: "Password was changed successfully",
      });
    }
    return res.status(400).send({
      code: 400,
      success: false,
      message: "Failed to change password !!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      code: 500,
      success: false,
      message: "An error occurred while changing password ",
    });
  }
};

exports.signUp = async (req, res, next) => {
  try {
    const { name, emailId, password } = req.body;

    if (!name || !emailId || !password) {
      return res.status(422).send({
        code: 422,
        success: false,
        message: "Require parameters missing !!",
      });
    }

    let result = await AppUsers.create({
      name: name,
      emailId: emailId,
      password: password,
      userType: "SUPERADMIN",
    });

    if (result != null) {
      const data = JSON.parse(JSON.stringify(result));
      var token = jwt.sign({ id: data["_id"] }, process.env.SECRETKEY);
      return res.status(200).send({
        code: 200,
        success: true,
        userDetails: data,
        accessToken: token,
        message: "Sign Up Successfully",
      });
    }
    return res.status(400).send({
      code: 400,
      success: false,
      message: "Login Failed !!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      code: 500,
      success: false,
      message: "An error occurred",
    });
  }
};

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminUsersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: [
        "SUPERADMIN",
        "STAFF",
      ],
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);
module.exports = mongoose.model("AdminUsers", adminUsersSchema);

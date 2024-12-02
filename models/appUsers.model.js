const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const appUsersSchema = new Schema(
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
  },
  { timestamps: true, versionKey: false }
);
module.exports = mongoose.model("AppUsers", appUsersSchema);

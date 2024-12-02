const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true
    },
    subType : {
      type: String,
      required: true,
    },
    isMilkAdded : {
      type: Boolean,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sizes: {
      type: [String],
      required: true,
    } 
  },
  { timestamps: true, versionKey: false }
);
module.exports = mongoose.model("Product", ProductSchema);

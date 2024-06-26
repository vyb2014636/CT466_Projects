const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    size: [
      {
        title: String,
        sold: {
          type: Number,
          default: 0,
        },
        quantity: {
          type: Number,
          default: 0,
        },
      },
    ],
    quantity: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    thumb: {
      type: String,
      require: true,
    },
    images: {
      type: Array,
    },
    color: {
      type: String,
      require: true,
    },
    rating: [
      {
        star: { type: Number },
        postedBy: { type: mongoose.Types.ObjectId, ref: "User" },
        comment: { type: String },
        updatedAt: { type: Date },
      },
    ],
    totalsRatings: {
      type: Number,
      default: 0,
    },
    varriants: [
      {
        title: String,
        color: String,
        price: Number,
        thumb: String,
        size: [{ title: String, quantity: Number, sold: Number }],
        images: Array,
        SKU: String,
      },
    ],
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);

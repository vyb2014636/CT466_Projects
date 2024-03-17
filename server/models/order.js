const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Types.ObjectId, ref: "Product" },
      count: Number,
      color: String,
    },
  ],
  status: {
    type: String,
    default: "Processing",
    enum: ["Cancelled", "Processing", "Successed"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//Export the model
module.exports = mongoose.model("Oder", orderSchema);

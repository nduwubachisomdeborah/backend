const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    productcart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cart",
    },
    totalAmount: {
      type: String,
    },
    delivery: {
      address: {
        type: String,
      },
    },
    payment: {
      currency: {
        type: String,
      },
      paymentStatus: {
        type: String,
        default: "not paid",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", orderSchema);

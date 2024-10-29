const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    url: {
    type: String,
  
  },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount_price: {
      type: Number,
      required: false,
    },
    desc: {
      type: String,
      required: true,
      min: 10,
      max: 100,
    },
    image: [],
    quantity: {
      type: Number,
    },
    variety: {
      color: {
        type: String,
      },
      size: {
        type: Number,
      },
      gender: {
        type: String,
      },
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    Comment: {
      text: {
        type: String,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    },
    rating: {
      stars: {
        type: Number,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);

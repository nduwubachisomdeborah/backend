const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      street: {
        type: String,
      },
      suite: {
        type: String,
      },
      city: {
        type: String,
      },
      zipcode: {
        type: String,
      },
      geo: {
        lat: {
          type: String,
        },
        lng: {
          type: String,
        },
      },
    },
    phone: {
      type: Number,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    website: {
      type: String,
      // default: "https://google.com",
    },
    company: {
      name: {
        type: String,
      },
      catchPhrase: {
        type: String,
      },
      bs: {
        type: String,
      },
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 12,
    },
    carts: [],
    profilePics: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("user", userSchema);

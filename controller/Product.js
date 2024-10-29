const Product = require("../model/Product");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../services/Cloudinary");
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    discount_price,
    desc,
    image,
    quantity,
    variety,
    category,
    brand,
  } = req.body;
  try {
    const ProductExits = await Product.findOne({ name });
    if (ProductExits) {
      res.status(506).json({
        message: "Product Already Exit",
      });
    }
    // upload image to cloudinary
    const uploadedImages = await Promise.all(
      image.map(async (image, index) => {
        const result = await cloudinary.uploader.upload(image, {
          folder: "products", // Optional: store images in a specific folder in Cloudinary
          // Use slug and brand for a unique identifier
          fileName: `${req.body.name}.jpg`,
        });

        return {
          url: result.secure_url,
        };
      })
    );
    const newProducts = await Product.create({
      name,
      price,
      discount_price,
      desc,
      image: uploadedImages,
      quantity,
      variety,
      category,
      brand,
    });
    res.status(200).json({
      _id: newProducts._id,
      name: newProducts.name,
      price: newProducts.price,
      discount_price: newProducts.discount_price,
      desc: newProducts.desc,
      image: newProducts.image,
      quantity: newProducts.quantity,
      variety: newProducts.variety,
      category: newProducts.category,
      brand: newProducts.brand,
    });
  } catch (error) {
    res.status(401).json({
      message: "Error",
      error,
    });
  }
});
const postreddgtg = asyncHandler(async (res, req) => {});

module.exports = { createProduct };

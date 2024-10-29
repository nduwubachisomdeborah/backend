const express = require("express");
const { createProduct } = require("../controller/Product");
const Product = require("../model/Product");

const router = express.Router();

router.post("/", createProduct);
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({
      products,
    });
  } catch (error) {
    res.json({
      message: "failed to fetch data",
    });
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const debby = await Product.findById(id);
    if (!debby) {
      res.status(600).json({
        message: "product not found",
      });
    }
    res.status(200).json({
      message: "successful",
      debby,
    });
  } catch (error) {
    res.status(401).json({
      message: "error",
      error,
    });
  }
});
router.put("/:id", async (req, res) => {
  const { id } = req.params; //WHERE to pass ur parameter and request.body
  const {
    url,
    name,
    price,
    discount_price,
    desc,
    image,
    quanity,
    variety,
    category,
    brand,
    Comment,
    rating,
  } = req.body;
  try {
    const updateData = await Product.findById(id);
    if (!updateData) {
      res.status(701).json({
        message: "data not found",
        updateData,
      });
    }
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

    updateData.url = url || updateData.url;
    updateData.name = name || updateData.name;
    updateData.price = price || updateData.price;
    updateData.discount_price = discount_price || updateData.discount_price;
    updateData.desc = desc || updateData.desc;
    updateData.image = uploadedImages || updateData.image;
    updateData.variety = variety || updateData.variety;
    updateData.category = category || updateData.category;
    updateData.brand = brand || updateData.brand;
    updateData.Comment = Comment || updateData.Comment;
    updateData.quanity = quanity || updateData.quanity;
    updateData.rating = rating || updateData.rating;
    await updateData.save();
    res.status(200).json({
      message: "update successful",
      updateData,
    });
  } catch (error) {
    res.status(401).json({
      massage: "error in update",
      error,
    });
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteContent = await Product.findByIdAndDelete(id);
    if (!deleteContent) {
      res.status(965).json({
        message: "product not found",
      });
    }
    res.status(300).json({
      message: "delete successful",
      deleteContent,
    });
  } catch (error) {
    res.status(405).json({
      message: "error",
      error,
    });
  }
});

module.exports = router;

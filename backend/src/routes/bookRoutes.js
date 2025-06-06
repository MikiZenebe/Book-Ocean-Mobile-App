import express from "express";
import Book from "../models/BookSchema.js";
import cloudinary from "../lib/cloudinary.js";
import protectRoute from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protectRoute, async (req, res) => {
  try {
    const { title, caption, rating, image } = req.body;

    if (!title || !caption || !rating || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //upload image to cloudinary
    const uploadRes = await cloudinary.uploader.upload(image);
    const imageUrl = uploadRes.secure_url;

    //save to database
    const newBook = new Book({
      title,
      caption,
      rating,
      image: imageUrl,
      user: req.user?._id,
    });
    await newBook.save();

    res.status(201).json(newBook);
  } catch (error) {
    console.log("Error in creating book", error);

    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

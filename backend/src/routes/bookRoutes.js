import express from "express";
import Book from "../models/BookSchema.js";
import cloudinary from "../lib/cloudinary.js";
import protectRoute from "../middleware/authMiddleware.js";

const router = express.Router();

//Add new book
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

//Fetch books with pagination
router.get("/", protectRoute, async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const skip = (page - 1) * limit;

    const books = await Book.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username profileImage");

    const totalBooks = await Book.countDocuments();

    res.send({
      books,
      currentPage: page,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
    });
  } catch (error) {
    console.log("Error in fetching book", error);

    res.status(500).json({ message: "Internal server error" });
  }
});

//delete the book
router.delete("/:id", protectRoute, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    //check if user is the creator of the book
    if (book.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "unauthorized" });

    //delete the image
    if (book.image && book?.image.includes("cloudinary")) {
      try {
        const publicId = book.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.log("Error in deleting image in cloudinary", error);
      }
    }

    await book.deleteOne();

    res.json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.log("Error in deleting book", error);

    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

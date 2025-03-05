const Book = require('../model/bookModel.js');
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Add a Book (Admin)
exports.addBook = catchAsyncErrors(async (req, res, next) => {
  const { title, author, genre, publishedYear } = req.body;
  const book = await Book.create({ title, author, genre, publishedYear });

  res.status(201).json({ success: true, message: 'Book added successfully', book });
});

// Update a Book (Admin)
exports.updateBook = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { title, author, genre, publishedYear } = req.body;

  const book = await Book.findByIdAndUpdate(id, { title, author, genre, publishedYear }, { new: true });

  if (!book) {
    return next(new ErrorHandler('Book not found', 404));
  }

  res.status(200).json({ success: true, message: 'Book updated successfully', book });
});

// Delete a Book (Admin)
exports.deleteBook = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const book = await Book.findByIdAndDelete(id);

  if (!book) {
    return next(new ErrorHandler('Book not found', 404));
  }

  res.status(200).json({ success: true, message: 'Book deleted successfully' });
});

// Get All Books
exports.getAllBooks = catchAsyncErrors(async (req, res, next) => {
  const books = await Book.find();
  res.status(200).json({ success: true, books });
});

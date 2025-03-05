const Book = require('../model/bookModel.js');
const Borrowing = require('../model/borrowingModel.js');
const Member = require('../model/userModel.js');
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Borrow a Book (Member, check availability)
exports.borrowBook = catchAsyncErrors(async (req, res, next) => {
  const { memberId, bookId } = req.body;

  // Check if the book exists
  const book = await Book.findById(bookId);
  if (!book) {
    return next(new ErrorHandler('Book not found', 404));
  }

  // Check if the book is already borrowed
  const existingBorrow = await Borrowing.findOne({ bookId, returned: false });
  if (existingBorrow) {
    return next(new ErrorHandler('Book is already borrowed', 400));
  }

  // Record borrowing
  const borrowing = await Borrowing.create({ memberId, bookId, borrowedDate: new Date(), returned: false });

  res.status(201).json({ success: true, message: 'Book borrowed successfully', borrowing });
});

// Return a Book (Member)
exports.returnBook = catchAsyncErrors(async (req, res, next) => {
  const { memberId, bookId } = req.body;

  // Find the borrowing record
  const borrowing = await Borrowing.findOne({ memberId, bookId, returned: false });
  if (!borrowing) {
    return next(new ErrorHandler('No active borrowing record found', 404));
  }

  // Mark as returned
  borrowing.returned = true;
  borrowing.returnedDate = new Date();
  await borrowing.save();

  res.status(200).json({ success: true, message: 'Book returned successfully', borrowing });
});

// View Borrowing Records (Librarian, Admin)
exports.getBorrowingRecords = catchAsyncErrors(async (req, res, next) => {
  const records = await Borrowing.find().populate('memberId bookId');
  res.status(200).json({ success: true, records });
});

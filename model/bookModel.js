const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  publishedYear: {
    type: Number,
    required: true
  },
  availableCopies: {
    type: Number,
    required: true,
    default: 1
  },
  totalCopies: {
    type: Number,
    required: true,
    default: 1
  },
  borrowedBy: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    borrowedDate: {
      type: Date,
      default: Date.now
    },
    returnDate: {
      type: Date
    }
  }]
}, { timestamps: true });

bookSchema.methods.borrowBook = function (userId) {
  if (this.availableCopies > 0) {
    this.borrowedBy.push({ userId });
    this.availableCopies -= 1;
    return this.save();
  } else {
    throw new Error('No available copies');
  }
};

bookSchema.methods.returnBook = function (userId) {
  const borrowedIndex = this.borrowedBy.findIndex(entry => entry.userId.toString() === userId.toString() && !entry.returnDate);
  if (borrowedIndex !== -1) {
    this.borrowedBy[borrowedIndex].returnDate = new Date();
    this.availableCopies += 1;
    return this.save();
  } else {
    throw new Error('Book not borrowed by this user or already returned');
  }
};

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;

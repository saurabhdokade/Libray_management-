const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const { borrowBook,returnBook,getBorrowingRecords } = require('../controller/borrowingController');
const { validateBorrow, validateReturn } = require('../utils/borrowingValidation');

router.route('/borrow').post(validateBorrow,borrowBook);

router.route('/return').post(validateReturn, returnBook);

router.route('/records').get(isAuthenticatedUser,authorizeRoles("Admin","Librarian"),getBorrowingRecords);

module.exports = router;

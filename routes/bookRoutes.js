const express = require('express');
const { addBook, updateBook, deleteBook, getAllBooks } = require('../controller/bookController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const validateBook = require('../utils/bookValidation');
const router = express.Router();

router.route('/add').post(validateBook, isAuthenticatedUser,authorizeRoles("Admin"),addBook);

router.route('/update/:id').put(validateBook,isAuthenticatedUser,authorizeRoles("Admin"),updateBook);

router.route('/delete/:id').delete(isAuthenticatedUser,authorizeRoles("Admin"),deleteBook);

router.route('/all').get(getAllBooks);

module.exports = router;

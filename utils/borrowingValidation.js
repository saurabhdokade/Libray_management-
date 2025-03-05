const Joi = require('joi');
const mongoose = require('mongoose');

const objectIdValidator = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message('Invalid ObjectId format');
  }
  return value;
};

const borrowSchema = Joi.object({
  memberId: Joi.string().custom(objectIdValidator).required(),
  bookId: Joi.string().custom(objectIdValidator).required(),
});

const returnSchema = Joi.object({
  memberId: Joi.string().custom(objectIdValidator).required(),
  bookId: Joi.string().custom(objectIdValidator).required(),
});

const validateBorrow = (req, res, next) => {
  const { error } = borrowSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }
  next();
};

const validateReturn = (req, res, next) => {
  const { error } = returnSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }
  next();
};

module.exports = { validateBorrow, validateReturn };

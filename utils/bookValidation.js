const Joi = require('joi');

const bookSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  author: Joi.string().min(3).max(255).required(),
  genre: Joi.string().min(3).max(100).required(),
  publishedYear: Joi.number().integer().min(1000).max(new Date().getFullYear()).required(),
});

const validateBook = (req, res, next) => {
  const { error } = bookSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }
  next();
};

module.exports = validateBook;

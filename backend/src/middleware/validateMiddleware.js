const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse(req.body);
    req.body = parsed;
    next();
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.errors.map(err => ({ field: err.path.join('.'), message: err.message }))
      });
    }
    return res.status(400).json({ message: 'Invalid input' });
  }
};

module.exports = validate;

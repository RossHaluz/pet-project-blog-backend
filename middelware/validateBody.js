const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "Bed request",
      });
    }
    next();
  };
  return func;
};

module.exports = { validateBody };

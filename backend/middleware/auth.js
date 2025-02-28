const auth = (req, res, next) => {
  // For now, just pass through
  // Later we'll implement proper authentication
  next();
};

module.exports = auth; 
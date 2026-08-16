/**
 * 404 Not Found middleware.
 * Catches requests that don't match any route.
 */
const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

module.exports = notFound;

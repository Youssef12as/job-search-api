const errorHandler = (err, req, res, next) => {
  console.error(`[${err.name || 'Error'}] ${err.message} | ${req.method} ${req.path}`);
  const statusCode = err.statusCode || 500;
  const msg = err.statusCode ? err.message : 'Something went wrong, please try again later';
  res.status(statusCode).json({ success: false, msg });
};

export default errorHandler;

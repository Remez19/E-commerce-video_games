export const errorMiddleware = (error, req, res, next) => {
  console.log(error);
  // if error.statusCode not defined than 500 will be default
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data });
};

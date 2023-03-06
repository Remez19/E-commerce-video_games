export const errorMiddleware = (error, req, res, next) => {
  console.log(error);
  // if error.statusCode not defined than 500 will be default
  // Need to work on this
  const status = error.statusCode || 500;
  const messageClient =
    error.messageClient || error.message || "Something Went Worng.";
  const data = error.data;
  res.status(status).json({ messageClient, data });
};

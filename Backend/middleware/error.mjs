export const errorMiddleware = (error, req, res, next) => {
  console.log(error);
  // if error.statusCode not defined than 500 will be default
  // Need to work on this
  const status = error.statusCode || 500;
  let messageClient =
    error.messageClient || error.message || "Something Went Worng.";
  let dataMessage = "";
  const data = error.data;
  if (data) {
    // getting all the errors
    for (const value of data) {
      dataMessage += value.msg + "/n";
    }
  }
  res.status(status).json({ messageClient, dataMessage });
};

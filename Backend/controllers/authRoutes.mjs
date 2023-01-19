export const postLogin = (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  console.log(email, password);

  res.status(200).json({
    message: "Login OK",
  });
};

export const postSignup = (req, res, next) => {
  const { email, password, userName } = req.body;
  res.status(200).json({
    message: "Signup OK.",
  });
};

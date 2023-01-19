export const postLogin = (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  console.log(email, password);
  res.status(500).json({
    message: "Login Failed.",
  });
};

export const postSignup = (req, res, next) => {};

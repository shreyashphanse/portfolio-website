export const checkPassword = (req, res, next) => {
  const password = req.headers.password;

  if (!password) {
    return res.status(401).json({ message: "Password required" });
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(403).json({ message: "Invalid password" });
  }

  next();
};

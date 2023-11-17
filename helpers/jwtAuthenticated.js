const jwt = require("jsonwebtoken");

const jwtAuthenticated = (req, res, next) => {
  const cookie = req.headers.authorization;

  if (!cookie) {
    res.json({
      success: false,
      message: "Acceso denegado",
    });
    return;
  }
  try {
    jwt.verify(cookie, process.env.JWT_PASSWORD);
    next();
  } catch (error) {
    console.log("error", error);
    res.json({
      success: false,
    });
  }
};

module.exports = jwtAuthenticated;
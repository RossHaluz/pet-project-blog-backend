const jwt = require("jsonwebtoken");

const checkAuth = async (req, res, next) => {
  const authToken = req.headers.authorization || "";

  if (!authToken) {
    return res.status(403).json({
      message: "No access",
    });
  }
  const [bearer, token] = await authToken.split(" ", 2);
  if (bearer !== "Bearer") {
    res.status(401).json({
      message: "Not authorized1",
    });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    req.userId = decoded.id;

    next();
  });
};

module.exports = checkAuth;

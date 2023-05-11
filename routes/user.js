const router = require("express").Router();
const checkAuth = require("../middelware/checkAuth.js");
const {
  register,
  login,
  authMe,
  uploadAvatar,
} = require("../controlers/user.js");
const { validateBody } = require("../middelware/validateBody.js");
const { registerValidator, loginValidator } = require("../schema/schema.js");
const upload = require("../middelware/upload.js");

router.post("/register", validateBody(registerValidator), register);

router.post("/login", validateBody(loginValidator), login);

router.get("/me", checkAuth, authMe);

router.patch("/avatars", checkAuth, upload.single("avatar"), uploadAvatar);

module.exports = router;

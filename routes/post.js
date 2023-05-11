const express = require("express");
const { validateBody } = require("../middelware/validateBody.js");
const { postCreatValidator } = require("../schema/schema.js");
const {
  getAll,
  getOne,
  add,
  update,
  removePost,
} = require("../controlers/posts.js");
const checkAuth = require("../middelware/checkAuth.js");

const router = express.Router();

router.get("/", getAll);

router.get("/:postId", checkAuth, getOne);

router.post("/add", checkAuth, validateBody(postCreatValidator), add);

router.patch("/:postId", checkAuth, update);

router.delete("/:postId", checkAuth, removePost);

module.exports = router;

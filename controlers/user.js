const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs").promises;
const crypto = require("crypto");

const UserModal = require("../models/User.js");
const pathDir = path.join(__dirname, "..", "public", "avatars");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModal.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "User found",
      });
    }
    const passwordHesh = await bcrypt.hash(password, 10);
    const newUser = await UserModal.create({
      ...req.body,
      password: passwordHesh,
    });

    res.json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Can't register:(",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModal.findOne({ email });
  if (!user) {
    return res.status(500).message({
      message: "User not found",
    });
  }
  const isValidPass = await bcrypt.compare(password, user.password);
  if (!isValidPass) {
    return res.status(404).json({
      message: "Password or email not valid",
    });
  }
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "24h" });
  await UserModal.findByIdAndUpdate(user._id, { token });

  const { ...userData } = user._doc;

  res.json({
    ...userData,
    token,
  });
};

const authMe = async (req, res) => {
  try {
    const user = await UserModal.findById(req.userId);

    if (!user) {
      return res(404).json({
        message: "User not found",
      });
    }
    res.json(user);
  } catch (error) {
    res.status(404).json({
      message: "User not found",
    });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    const { id } = req.userId;
    const { path: tempDir, originalname } = req.file;
    const filename = `${crypto.randomUUID()}_${originalname}`;
    const resultDir = path.join(pathDir, filename);
    await fs.rename(tempDir, resultDir);
    const avatarUrl = path.join("avatars", filename);
    await UserModal.findByIdAndUpdate(id, { avatarUrl });

    res.json({ avatarUrl });
  } catch (error) {
    res.status(500).json({
      message: "Can not upload image",
    });
  }
};

module.exports = {
  register,
  login,
  authMe,
  uploadAvatar,
};

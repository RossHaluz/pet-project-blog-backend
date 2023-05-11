const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    token: {
      type: String,
      default: "",
      require: true,
    },
    avatarUrl: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModal = mongoose.model("user", UserSchema);

module.exports = UserModal;

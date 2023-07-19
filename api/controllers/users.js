const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, NODE_ENV } = process.env;
const base64Img = require("base64-img");
const fsExtra = require("fs-extra");

const User = require("../models/users");
const NotFoundError = require("../errors/not-found-err");
const ValidationError = require("../errors/validation-err");
const ConflictingRequest = require("../errors/conflicting-err");
const UnauthorizedError = require("../errors/unauthorized-err");

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  User.findOne({ email })
    .then((data) => {
      if (data) {
        throw new ConflictingRequest(
          "Пользователь с таким E-mail уже существует."
        );
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) =>
      User.create({
        email,
        name,
        password: hash,
      })
    )
    .then((data) => {
      const token = jwt.sign(
        { _id: data._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        { expiresIn: "7d" }
      );
      res
        .cookie("jwt", `Bearer ${token}`, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: "None",
          secure: true,
        })
        .send({ email: data.email, name: data.name });
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
    throw new ValidationError("Некорректный id юзера");
  }
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Нет пользователя с таким id");
      }
      res.send(user);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        { expiresIn: "7d" }
      );
      res
        .cookie("jwt", token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
          secure: NODE_ENV === "production",
        })
        .send({ token });
    })
    .catch((err) => {
      next(new UnauthorizedError(err.message));
      return;
    });
};

module.exports.unlogin = (req, res, next) => {
  const owner = req.user._id;
  User.findById(owner)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Нет пользователя с таким id");
      } else {
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
          { expiresIn: "7d" }
        );
        res.cookie("jwt", token, {
          maxAge: 0,
          httpOnly: true,
          sameSite: true,
        });
        console.log("выход прошел успешно");
        return res.send({ token });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        throw new ValidationError("Нет пользователя с таким id");
      } else {
        return next(err);
      }
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const fileDir = "./public";

  fsExtra.emptyDirSync(fileDir);

  const { avatar } = req.body;

  base64Img.img(avatar, fileDir, Date.now(), function (err, filepath) {
    const pathArr = filepath.split("\\");
    const fileName = pathArr[pathArr.length - 1];

    User.findByIdAndUpdate(
      req.user._id,
      { avatar: fileName },
      { new: true, runValidators: true }
    )
      .then((user) => {
        if (!user) {
          throw new NotFoundError("Пользователя нет в базе");
        }
        res.send(user);
      })
      .catch((err) => {
        if (err.name === "ValidationError") {
          next(new ValidationError(err.message));
          return;
        } else {
          next(err);
        }
      });
  });
};

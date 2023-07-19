const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const { NODE_ENV } = process.env;
const UnauthorizedError = require("../errors/unauthorized-err");
const NotFoundError = require("../errors/not-found-err");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "Неверный адрес почты",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        // return Promise.reject(new Error("Неправильные почта или пароль"));
        return Promise.reject(
          NODE_ENV === "production"
            ? new Error("Неправильные почта или пароль")
            : new NotFoundError("Нет пользователя с таким email")
        );
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          // return Promise.reject(new Error("Неправильные почта или пароль"));
          return Promise.reject(
            NODE_ENV === "production"
              ? new Error("Неправильные почта или пароль")
              : new UnauthorizedError("Неверный пароль")
          );
        }
        return user;
      });
    });

  // .then((user) => {
  //   if (!user) {
  //     return Promise.reject(
  //       NODE_ENV === "production"
  //         ? new Error("Неправильные почта или пароль")
  //         : new NotFoundError("Нет пользователя с таким email")
  //     );
  //   }
  //   return bcrypt.compare(password, user.password).then((matched) => {
  //     if (!matched) {
  //       return Promise.reject(
  //         NODE_ENV === "production"
  //           ? new Error("Неправильные почта или пароль")
  //           : new UnauthorizedError("Неверный пароль")
  //       );
  //     }
  //     return user;
  //   });
  // });
};

module.exports = mongoose.model("user", userSchema);

const imgSchema = require("../models/uploads");
//const NotFoundError = require("../errors/not-found-err");
//const ValidationError = require("../errors/validation-err");
//const Forbidden = require("../errors/forbidden-err");
const base64Img = require("base64-img");

module.exports.uploadsImage = (req, res, next) => {
  const { image, owner = req.user._id } = req.body;

  base64Img.img(image, "./public", Date.now(), function (err, filepath) {
    const pathArr = filepath.split("\\");
    const fileName = pathArr[pathArr.length - 1];

    const obj = {
      image: "http://localhost:3000/public/" + fileName,
      owner,
    };

    imgSchema
      .create(obj)
      .then((result) => res.status(200).send(result))
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

module.exports.getAllImages = (req, res, next) => {
  imgSchema
    .find({})
    .find({ owner: req.user._id })
    .then((result) => res.status(200).send(result))
    .catch(next);
};

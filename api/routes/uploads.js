const uploadsRouter = require("express").Router(); // создадим express router
const { celebrate, Joi } = require("celebrate");
const { uploadsImage, getAllImages } = require("../controllers/uploads");

uploadsRouter.get("/", getAllImages);

uploadsRouter.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      image: Joi.string().required(),
    }),
  }),
  uploadsImage
);

module.exports = uploadsRouter;

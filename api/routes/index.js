const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const userRouter = require("./users");
const resultRouter = require("./results");
const { login, createUser, unlogin } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser
);

router.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login
);

router.use("/users", auth, userRouter);
router.post("/exit", auth, unlogin);
router.use("/results", auth, resultRouter);

module.exports = router;

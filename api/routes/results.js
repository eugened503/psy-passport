const resultRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createResults, getAllResults, deleteResults } = require('../controllers/results');
//const validateUrl = require('../constants/urlRegex');

resultRouter.get('/', getAllResults);

resultRouter.post('/', celebrate({
  body: Joi.object().keys({
    test: Joi.array().required(),
    temperament: Joi.string().required(),
    answers: Joi.array().required(),
    options: Joi.array().required(),
  })
}), createResults);

resultRouter.delete('/:resultId', celebrate({
  params: Joi.object().keys({
    resultId: Joi.string().length(24).hex(),
  }),
}), deleteResults);

module.exports = resultRouter;
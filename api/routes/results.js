const resultRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createResults, getAllResults, deleteResults } = require('../controllers/results');
//const validateUrl = require('../constants/urlRegex');

resultRouter.get('/', getAllResults);

resultRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    records: Joi.object().required(),
  })
}), createResults);

resultRouter.delete('/:resultId', celebrate({
  params: Joi.object().keys({
    resultId: Joi.string().length(24).hex(),
  }),
}), deleteResults);

module.exports = resultRouter;
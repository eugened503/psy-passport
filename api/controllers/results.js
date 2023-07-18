const mongoose = require('mongoose');
const result = require('../models/results');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-err');
const Forbidden = require('../errors/forbidden-err');

// module.exports.createResults = (req, res, next) => {
//   const { test, temperament, answers, options, owner = req.user._id } = req.body;
//   result.create({ test, temperament, answers, options, owner })
//     .then((result) => res.status(200).send({ data: result }))
//     .catch((err) => {
//       if (err.name === 'ValidationError') {
//         next(new ValidationError(err.message));
//         return;
//       }
//       else {
//         next(err);
//       }
//     });
// };

module.exports.createResults = (req, res, next) => {
  const { name, title, records, owner = req.user._id } = req.body;
  result.create({ name, title, records, owner })
    .then((result) => res.status(200).send({ data: result }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(err.message));
        return;
      }
      else {
        next(err);
      }
    });
};


module.exports.getAllResults = (req, res, next) => {
  result.find({})
    .find({ owner: req.user._id })
    .then(result => res.status(200).send(result))
    .catch(next);
};


module.exports.deleteResults = (req, res, next) => {
  result.findById(req.params.resultId)
    .select('+owner')
    .orFail(new NotFoundError(404, 'Некорректный id карточки'))
    .then((result) => {
      if (result.owner.toString() === req.user._id) {
        result.deleteOne({ _id: req.params.resultId })
          .then((resultDel) => res.send(resultDel))
          .catch(next);
      } else {
       throw new Forbidden(403, 'Вы не можете удалять чужие карточки');
      }
    })
    .catch(next);
};

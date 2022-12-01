const mongoose = require('mongoose');
const result = require('../models/results');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-err');
const Forbidden = require('../errors/forbidden-err');

module.exports.createResults = (req, res, next) => { //создаёт статью с переданными в теле
  const { test, temperament, answers, options, owner = req.user._id } = req.body;
  result.create({ test, temperament, answers, options, owner })
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

module.exports.getAllResults = (req, res, next) => { //возвращает все сохранённые пользователем статьи
  result.find({})
    .find({ owner: req.user._id })
    .then(result => res.status(200).send(result))
    .catch(next);
};

// module.exports.deleteArticles = (req, res, next) => { // удаляет сохранённую статью  по _id
//   if (!mongoose.Types.ObjectId.isValid(req.params.articleId)) {
//     throw new ValidationError('Некорректный id карточки');
//   }
//   Article.findById(req.params.articleId)
//     .orFail(new Error('NotValidId'))
//     .then((article) => {
//       if (String(article.owner) !== String(req.user._id)) {
//         next(new Forbidden('Вы не можете удалять чужие карточки'));
//         return;
//       }
//       Article.findByIdAndRemove(req.params.articleId)
//         .then(() => res.status(200).send(article))
//         .catch(next);
//     })
//     .catch((err) => {
//       if (err.message === 'NotValidId') {
//         next(new NotFoundError('Пользователя нет в базе'));
//         return;
//       } else {
//         next(err);
//       }
//     });
// };
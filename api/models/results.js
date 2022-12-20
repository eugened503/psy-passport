const mongoose = require("mongoose");

// const resultSchema = new mongoose.Schema({
//   test: [
//     {
//       scale: { type: String, required: true },
//       total: { type: Number, required: true },
//       desc: { type: String, required: true },
//     },
//     {
//       scale: { type: String, required: true },
//       total: { type: Number, required: true },
//       desc: { type: String, required: true },
//     },
//     {
//       scale: { type: String, required: true },
//       total: { type: Number, required: true },
//       desc: { type: String, required: true },
//     },
//   ],
//   temperament: {
//     type: String,
//     required: true,
//   },
//   answers: {
//     type: Array,
//     required: true,
//   },
//   owner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "user",
//     required: true,
//   },
//   options: [ {
//       data: {
//         type: Array,
//         required: true,
//       }
//     },
//   ]
// });

const resultSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  records: {
    type: Object,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports = mongoose.model("result", resultSchema);

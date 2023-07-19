const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports = mongoose.model("images", imageSchema);

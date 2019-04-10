const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CarSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

});
module.exports = Cars = mongoose.model("cars", CarSchema);

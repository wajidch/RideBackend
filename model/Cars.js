const mongoose = require("mongoose"),
      Common  =  require("./common");

const Schema = mongoose.Schema;

const CarSchema = new Schema({
  
  carNumber: {  type: String,  required: true },
  password: { type: String, required: true},
  status: {  type: String,  required: false },
  rideCount: {  type: Number,  required: false },
  user: Common.userInfo
});
module.exports = Cars = mongoose.model("cars", CarSchema);

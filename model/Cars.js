const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CarSchema = new Schema({
  
  carNumber: {  type: String,  required: true },
  password: { type: String, required: true},
  status: {  type: String,  required: false },
  rideCount: {  type: Number,  required: false }
});
module.exports = Cars = mongoose.model("cars", CarSchema);

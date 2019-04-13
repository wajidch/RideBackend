const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RideSchema = new Schema({
    driver:  {type: Schema.Types.ObjectId, ref: 'Driver'},
    startPoint: { type: String, required: true },
    endPoint: { type: String, required: true  },
    addressStartingPoint: {   type: String, required: false},
    rideType: {  type: String, required: false },
    startTime: { type: String, required: true  }, //date field { type: String, required: true , default: Date.now },
    endTime: { type: String, required: true  },
    rideType: {  type: String, required: false },
    totalPassengers: {  type: Number, required: false },
    wheelChair: {  type: Boolean, required: false },
    paymentMethod: {  type: String, required: true },
    amount: {  type: Number, required: true },
    note: {  type: String, required: false },
    customer: {  type: String, required: true }

});
module.exports = Rides = mongoose.model("rides", RideSchema);

const mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    common = require('./common');


const RideSchema = new Schema({
    driver:  common.driverInfo,
    startPoint: { type: String },
    endPoint: { type: String },
    addressStartingPoint: { type: String },
    rideType: { type: String },
    startTime: { type: String }, //date field { type: String, required: true , default: Date.now },
    endTime: { type: String },
    rideType: { type: String },
    totalPassengers: { type: Number, default: 0 },
    wheelChair: { type: Boolean },
    paymentMethod: { type: String },
    amount: { type: Number },
    note: { type: String },
    customer: { type: String },

    createdOn: { type: Date,  default: Date.now },
    isPlanRideForToday: { type: Boolean, default: false },
    isPlanShiftForToday: { type: Boolean, default: false },
    car: common.carInfo

});
module.exports = Rides = mongoose.model("rides", RideSchema);

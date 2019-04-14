const mongoose = require("mongoose"),
Schema = mongoose.Schema,
common = require('./common');


const DriverSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true  },
    email: {   type: String, required: true},
    profileName: {  type: String, required: true },
    city: { type: String, required: false },
    address: {  type: String, required: false },
    dob: { type: Date, required: false , default: Date.now },
    status: {  type: String, required: false },
    rides: [common.rideInfo]

});
module.exports = Drivers = mongoose.model("drivers", DriverSchema);

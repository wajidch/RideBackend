const mongoose = require("mongoose");
Ride = require('./Rides');
const Schema = mongoose.Schema;

const DriverSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true  },
    email: {   type: String, required: true},
    profileName: {  type: String, required: true },
    city: { type: String, required: false },
    address: {  type: String, required: false },
    dob: { type: Date, required: false , default: Date.now },
    //rides: [Ride]

});
module.exports = Drivers = mongoose.model("drivers", DriverSchema);

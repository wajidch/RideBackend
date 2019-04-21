const mongoose = require("mongoose"),
Schema = mongoose.Schema,
common = require('./common');


const DriverSchema = new Schema({
    firstName: { type: String, trim:true },
    lastName: { type: String, trim: true  },
    email: {   type: String, trim: true},
    profileName: {  type: String, trim: true },
    city: { type: String, trim: true },
    address: {  type: String, trim: true },
    dob: { type: String},
    status: {  type: String, trim: true },
    carId: {type: String}

});
module.exports = Drivers = mongoose.model("drivers", DriverSchema);

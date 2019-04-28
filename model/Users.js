const mongoose = require("mongoose"),
Schema = mongoose.Schema,
common = require('./common');


const UserSchema = new Schema({
    firstName: { type: String, trim:true },
    lastName: { type: String, trim: true  },
    email: {   type: String, trim: true},
    password : {type: String, trime: true},
    profileName: {  type: String, trim: true },
    city: { type: String, trim: true },
    address: {  type: String, trim: true },
    dob: { type: String},
    status: {  type: String, trim: true },
    carId: {type: String},
    role: common.roleInfo

});
module.exports = Users = mongoose.model("users", UserSchema);

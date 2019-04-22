const mongoose = require("mongoose"),
Schema = mongoose.Schema;


const UserSchema = new Schema({
    firstName: { type: String, trim:true },
    lastName: { type: String, trim: true  },
    email: {   type: String, trim: true},
    profileName: {  type: String, trim: true },
    city: { type: String, trim: true },
    address: {  type: String, trim: true },
    dob: { type: String},
    status: {  type: String, trim: true },
    carId: {type: String},
    roleId: { type: String}

});
module.exports = Users = mongoose.model("users", UserSchema);

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RideSchema = new Schema({
    startPoint: {
        type: String,
        required: true
    },

    endPoint: {
        type: String,
        required: true
    },
    addressStartingPoint: {
        type: String,
        required: true
    },
    rideType: {
        type: String,
        required: true
    }

});
module.exports = Ride = mongoose.model("rides", RideSchema);

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const rideInfo = new Schema({

    startPoint: { type: String, required: true },
    endPoint: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    customer: { type: String, required: true }
});

const driverInfo = new Schema({
    driverId: { type: String },
    name: { type: String },
    status: { type: String }
});

const carInfo = new Schema({
    carId: { type: String },
    carNumber: { type: String }
});
module.exports = { rideInfo, driverInfo, carInfo }
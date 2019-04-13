const express = require("express");
const gravatar = require("gravatar");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Ride = require("../../model/Ride");


router.post("/createRide", (req, res) => {


    const newRide = new Ride({
        startPoint: req.body.startPoint,

        endPoint: req.body.endPoint,
        addressStartingPoint: req.body.addressStartingPoint,
        rideType: req.body.rideType

    });


    newRide
        .save()
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            console.log(err);
        });




});

router.get("/listOfRide", (req, res) => {

    Ride.find()
        .then(carList => {
            res.json(carList)
        })




});
module.exports = router;

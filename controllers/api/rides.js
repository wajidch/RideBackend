const express = require("express");
const gravatar = require("gravatar");
const Rides = require("../../model/Rides");


class RidesController{
    constructor(router){
      router.get('/', this.getRides.bind(this));
      //router.put('/:id', this.updateRide.bind(this));
      router.post('/', this.createRide.bind(this));
      //router.delete('/:id', this.deleteRide.bind(this));
    }

    getRides(req, res) {
      console.log(`controllers/api/rides/getRides`);
      Rides.find((err, rides) =>{
        if(err){
          console.log(`getRides error: ${err}`);
        }
        res.json(rides);
      });
    }
    
    createRide(req, res) { 
      console.log(`controllers/api/rides/createRide`);
      var postedDriver = req.body;
      var ride = new Rides();
      ride.driver = "3123123dfdf32332"; //postedDriver.driver;
      ride.startPoint  = postedDriver.startPoint;
      ride.endPoint  = postedDriver.endPoint;
      ride.startTime  = postedDriver.startTime;
      ride.endTime  = postedDriver.endTime;
      ride.totalPassengers  = postedDriver.totalPassengers;
      ride.wheelChair  = postedDriver.wheelChair;
      ride.rideType  = postedDriver.rideType;
      ride.paymentMethod  = postedDriver.paymentMethod;
      ride.amount  = postedDriver.amount;
      ride.note  = postedDriver.note;
      ride.customer  = postedDriver.customer;
      ride.driver  = postedDriver.driver; 
            
      ride.save((err, ride)=>{
        if(err){
          console.log(`createRide error: ${err}`);
        }
        res.json(ride);
      }); 
         
    }
 
    }
    module.exports = RidesController; 
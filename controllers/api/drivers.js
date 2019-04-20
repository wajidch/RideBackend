
const Drivers = require("../../model/Drivers"),
      Rides  =  require("../../model/Rides");


class DriversController {
  constructor(router) {
    router.get('/', this.getDrivers.bind(this));
    router.get('/:carId', this.getDriver.bind(this));
    router.put('/profile/:carId', this.updateDriver.bind(this));
    router.get('/mylastrides/:carId', this.myLastRides.bind(this));
  }



  getDrivers(req, res) {
    console.log(`controllers/api/drivers/getDrivers`);
    Drivers.find((err, drivers) => {
      if (err) {
        console.log(`getDrivers error: ${err}`);
        res.json(err);
      }
      console.log(`**get Drivers OK**`);
      res.json(drivers);
    });
  }

  updateDriver(req, res) {
    console.log(`controllers/api/drivers/updateDriver`);
    var postedDriver = req.body;

    Drivers.findOne({ 'carId': req.params.carId.toString() }, (err, dbDriver) => {
      if (err) {
        console.log('*** updateDriver error: ' + err);
        res.json({ status: false, error: 'Update failed', car: null });
      }
      dbDriver.firstName = postedDriver.firstName;
      dbDriver.lastName = postedDriver.lastName;
      dbDriver.email = postedDriver.email;
      dbDriver.profileName = postedDriver.profileName;
      dbDriver.city = postedDriver.city;
      dbDriver.address = postedDriver.address;
      dbDriver.dob = postedDriver.dob;
      dbDriver.status = "online";

      dbDriver.save((err, updatedDriver) => {
        if (err) {
          console.log(`updateCar error: ${err}`);
        }
        res.json(updatedDriver);
      });
    });

  }

  getDriver(req, res) {
    console.log(`controllers/api/drivers/getDriver`); 
      Drivers.findOne({ 'carId': req.params.carId.toString() }, (err, dbDriver) => {
        if (err) {
          console.log(`getDrivers error: ${err}`);
          res.json(err);
        }
        console.log(`**get Driver OK**`);
        res.json(dbDriver);
      });  
  }

  myLastRides(req,res) {
    console.log(`controllers/api/drivers/myLastRides`); 
    Rides.find({ 'carId': req.params.carId.toString()}).sort({createdOn:-1})
    .exec( (err, myLastRides) => {
      if (err) {
        console.log(`myRides error: ${err}`);
        res.json(err);
      }
      console.log(`**get myLastRides OK**`);
      res.json(myLastRides);
    });  
  }

}
module.exports = DriversController;
// router.post("/createRide", (req, res) => {


//     const newRide = new Ride({
//         startPoint: req.body.startPoint,

//         endPoint: req.body.endPoint,
//         addressStartingPoint: req.body.addressStartingPoint,
//         rideType: req.body.rideType

//     });


//     newRide
//         .save()
//         .then(user => {
//             res.json(user);
//         })
//         .catch(err => {
//             console.log(err);
//         });




// });

// router.get("/listOfRide", (req, res) => {

//     Ride.find()
//         .then(carList => {
//             res.json(carList)
//         })




// });


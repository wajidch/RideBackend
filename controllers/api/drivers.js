
const Drivers = require("../../model/Drivers");


class DriversController{
    constructor(router){
        router.get('/', this.getDrivers.bind(this));
    }

    getDrivers(req, res) {
        console.log(`controllers/api/drivers/getDrivers`);
        Drivers.find((err, drivers) =>{
          if(err){
            console.log(`getDrivers error: ${err}`);
            res.json(err);
          }
          res.json(drivers);
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


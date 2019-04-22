const Rides = require("../../model/Rides");


class RidesController {
  constructor(router) {
    router.get('/', this.getRides.bind(this));
    //router.put('/:id', this.updateRide.bind(this));
    router.post('/', this.createRide.bind(this));
    router.post('/todayPlannedRides', this.createTodayPlannedRides.bind(this));
    router.get('/todayPlannedRides', this.getTodayPlannedRides.bind(this));
    router.post('/todayPlannedShifts', this.createTodayPlannedShifts.bind(this));
    router.get('/todayPlannedShifts', this.getTodayPlannedShifts.bind(this));
    router.put('/sendRide', this.sendRideToDriver.bind(this));
    router.delete('/:id', this.deleteRide.bind(this));
  }

  getRides(req, res) {
    console.log(`controllers/api/rides/getRides`);
    Rides.find({ 'isPlanRideForToday': false, 'isPlanShiftForToday': false }, (err, rides) => {
      if (err) {
        console.log(`getRides error: ${err}`);
      }
      console.log(`**get Rides OK**`);
      res.json(rides);
    });
  }

  createRide(req, res) {
    console.log(`controllers/api/rides/createRide`);
    var postedDriver = req.body;
    var ride = new Rides();
    // ride.driver = "3123123dfdf32332"; //postedDriver.driver;
    ride.carId = postedDriver.carId;
    ride.startPoint = postedDriver.startPoint;
    ride.endPoint = postedDriver.endPoint;
    ride.startTime = postedDriver.startTime;
    ride.endTime = postedDriver.endTime;
    ride.totalPassengers = postedDriver.totalPassengers;
    ride.wheelChair = postedDriver.wheelChair;
    ride.rideType = postedDriver.rideType;
    ride.paymentMethod = postedDriver.paymentMethod;
    ride.amount = postedDriver.amount;
    ride.note = postedDriver.note;
    ride.customer = postedDriver.customer;
    ride.createdOn = new Date();

    ride.save((err, ride) => {
      if (err) {
        console.log(`createRide error: ${err}`);
      }
      res.json(ride);
      console.log(`createRide OK`);
    });

  }

  getTodayPlannedRides(req, res) {
    console.log(`controllers/api/rides/getTodayPlannedRides`);

    var start = new Date();
    start.setHours(0, 0, 0, 0);

    var end = new Date();
    end.setHours(23, 59, 59, 999);

    Rides.find({
      isPlanRideForToday: true,
      createdOn: { $gte: start, $lt: end }, isPlanShiftForToday: false
    }, (err, rides) => {
      if (err) {
        console.log(`getTodayPlannedRides error: ${err}`);
      }
      console.log(`**get Today Planned Rides OK**`);
      res.json(rides);
    });
  }

  createTodayPlannedRides(req, res) {
    console.log(`controllers/api/rides/createTodayPlannedRides`);
    var postedDriver = req.body;
    var ride = new Rides();

    ride.startPoint = postedDriver.startPoint;
    ride.endPoint = postedDriver.endPoint;
    ride.customer = postedDriver.customer;
    ride.isPlanRideForToday = true;
    ride.createdOn = new Date();

    ride.save((err, ride) => {
      if (err) {
        console.log(`createTodayPlannedRides error: ${err}`);
        res.json(err);
      }
      console.log(`**create Today Planned Rides OK**`);
      res.json(ride);
    });

  }

  getTodayPlannedShifts(req, res) {
    console.log(`controllers/api/rides/getTodayPlannedShifts`);

    var start = new Date();
    start.setHours(0, 0, 0, 0);

    var end = new Date();
    end.setHours(23, 59, 59, 999);
    var response = [];
    Rides.find({
      isPlanRideForToday: false,
      createdOn: { $gte: start, $lt: end }, isPlanShiftForToday: true
    }, (err, rides) => {
      if (err) {
        console.log(`getTodayPlannedShifts error: ${err}`);
      }
      console.log(`**get Today Planned Shifts OK**`);
      res.json(rides);

    });
  }

  createTodayPlannedShifts(req, res) {
    console.log(`controllers/api/rides/createTodayPlannedShifts`);
    var postedDriver = req.body;
    var ride = new Rides();

    ride.car = postedDriver.car;
    ride.driver = postedDriver.driver;
    ride.isPlanShiftForToday = true;
    ride.createdOn = new Date();

    ride.save((err, ride) => {
      if (err) {
        console.log(`createTodayPlannedShifts error: ${err}`);
        res.json(err);
      }
      console.log(`**create Today Planned Shifts OK**`);
      res.json(ride);
    });

  }

  sendRideToDriver(req, res) {
    console.log(`controllers/api/rides/sendRideToDriver`);
    var postedData = req.body;
    Rides.findOne({ '_id': postedData.rideId }, (err, dbRide) => {
      if (err) {
        console.log(`sendRideToDriver error: ${err}`);
      }
      dbRide.carId = postedData.driverCarId;
      dbRide.save((err, updatedRide) => {
        if (err) {
          console.log(`sendRideToDriver.updateRide error: ${err}`);
        }
        res.json(updatedRide);
        console.log(`**sendRideToDriver OK**`);
      });
    });


  }

  deleteRide(req, res) {
    console.log(`controllers/api/rides/deleteRide`);
    Rides.deleteOne({ '_id': req.params.id.toString() }, (err, deletedRide) => {
      if (err) {
        console.log(`deleteRide error: ${err}`);
        res.json(err);
      }
      console.log('**Delete Ride OK**');
      res.json(deletedRide);
    });
  }
}
module.exports = RidesController; 
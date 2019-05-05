const Rides = require("../../model/Rides");


class RidesController {
  constructor(router) {
    router.get('/', this.getRides.bind(this));
   // router.get('/:id', this.getRide.bind(this));
    router.put('/:id', this.updateRide.bind(this));
    router.post('/', this.createRide.bind(this));
    router.post('/todayPlannedRides', this.createTodayPlannedRides.bind(this));
    router.get('/todayPlannedRides', this.getTodayPlannedRides.bind(this));
    router.post('/todayPlannedShifts', this.createTodayPlannedShifts.bind(this));
    router.get('/todayPlannedShifts', this.getTodayPlannedShifts.bind(this));
    router.put('/sendRide', this.sendRideToDriver.bind(this));
    router.delete('/:id', this.deleteRide.bind(this));

  }

  getRide(req, res) {
    console.log(`controllers/api/rides/getRide`);
    Rides.findById(req.params.id, (err, dbRide) => {
      if (err) {
        console.log(`getRide error: ${err}`);
      }
      console.log(`**get Ride OK**`);
      res.json(dbRide);
    });
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
    var postedRide = req.body;
    var ride = new Rides();
    // ride.driver = "3123123dfdf32332"; //postedDriver.driver;
    ride.carId = postedRide.carId;
    ride.startPoint = postedRide.startPoint;
    ride.endPoint = postedRide.endPoint;
    ride.startTime = postedRide.startTime;
    ride.endTime = postedRide.endTime;
    ride.totalPassengers = postedRide.totalPassengers;
    ride.wheelChair = postedRide.wheelChair;
    ride.rideType = postedRide.rideType;
    ride.paymentMethod = postedRide.paymentMethod;
    ride.amount = postedRide.amount;
    ride.note = postedRide.note;
    ride.customer = postedRide.customer;
    ride.createdOn = new Date();
    ride.userId = postedRide.userId;

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
    var postedRide = req.body;
    var ride = new Rides();

    ride.carId = postedRide.carId;
    ride.startPoint = postedRide.startPoint;
    ride.endPoint = postedRide.endPoint;
    ride.startTime = postedRide.startTime;
    ride.endTime = postedRide.endTime;
    ride.totalPassengers = postedRide.totalPassengers;
    ride.wheelChair = postedRide.wheelChair;
    ride.rideType = postedRide.rideType;
    ride.paymentMethod = postedRide.paymentMethod;
    ride.amount = postedRide.amount;
    ride.note = postedRide.note;
    ride.customer = postedRide.customer;
    ride.createdOn = new Date();
    ride.userId = postedRide.userId;
    ride.isPlanRideForToday = true; 
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

  updateRide(req, res) {
    console.log(`controllers/api/rides/updateRide`);
    var postedRide = req.body;

    Rides.findById(postedRide._id, (err, dbRide) => {
      if (err) {
        console.log(`updateRide error: ${err}`);
      }

      dbRide.carId = postedRide.carId;
      dbRide.startPoint = postedRide.startPoint;
      dbRide.endPoint = postedRide.endPoint;
      dbRide.startTime = postedRide.startTime;
      dbRide.endTime = postedRide.endTime;
      dbRide.totalPassengers = postedRide.totalPassengers;
      dbRide.wheelChair = postedRide.wheelChair;
      dbRide.rideType = postedRide.rideType;
      dbRide.paymentMethod = postedRide.paymentMethod;
      dbRide.amount = postedRide.amount;
      dbRide.note = postedRide.note;
      dbRide.customer = postedRide.customer;
      dbRide.createdOn = new Date();
      dbRide.userId = postedRide.userId;

      dbRide.save((err, updatedRide) => {
        if (err) {
          console.log(`createRide error: ${err}`);
        }
        console.log(`**updateRide OK**`);
        res.json(updatedRide);
      });
    });
  }
}
module.exports = RidesController; 
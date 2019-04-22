const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
//Db config
const db = require("./config/keys").mongoURI;
const carsController = require("./controllers/api/cars.controller");
const ridesController = require("./controllers/api/rides.controller");
const driversController = require("./controllers/api/drivers.controller");
var cors = require('cors')


//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Mongo Db Connected"))
  .catch(err => console.log("Error :(", err));
app.use(cors());
//Car router
const carRouter = express.Router();
const controllerCarsClass = carsController;
const carController = new controllerCarsClass(carRouter);
//Ride router
const rideRouter = express.Router();
const controllerRidesClass = ridesController;
const rideController = new controllerRidesClass(rideRouter);
//Driver router
const driverRouter = express.Router();
const controllerDriversClass = driversController;
const driverController = new controllerDriversClass(driverRouter);

app.use("/api/cars", carRouter);
app.use("/api/rides", rideRouter);
app.use("/api/drivers", driverRouter);

const port = process.env.PORT || 3007;

app.listen(port, () => console.log(`Server Running on port ${port}`));

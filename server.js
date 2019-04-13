const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
//Db config
const db = require("./config/keys").mongoURI;
const cars = require("./controllers/api/cars");
const rides = require("./controllers/api/rides");
const drivers = require("./controllers/api/drivers");
const posts = require("./controllers/api/posts");
var cors = require('cors')


//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Mongo Db Connected"))
  .catch(err => console.log("Error :(", err));
app.use(cors());

const carRouter = express.Router();
const controllerCarsClass = cars;
const carController = new controllerCarsClass(carRouter);

const rideRouter = express.Router();
const controllerRidesClass = rides;
const rideController = new controllerRidesClass(rideRouter);


app.use("/api/cars", carRouter);
app.use("/api/rides", rideRouter);
app.use("/api/drivers", drivers);
app.use("/api/posts", posts);

const port = process.env.PORT || 5007;

app.listen(port, () => console.log(`Server Running on port ${port}`));

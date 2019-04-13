const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
//Db config
const db = require("./config/keys").mongoURI;
const cars = require("./controllers/api/cars");
const driver = require("./controllers/api/driver");
const posts = require("./controllers/api/posts");
var cors = require('cors')
const router = express.Router();

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Mongo Db Connected"))
  .catch(err => console.log("Error :(", err));
app.use(cors());
const controllerClass = cars;
const controller = new controllerClass(router);
app.use("/api/cars", router);
app.use("/api/driver", driver);
app.use("/api/posts", posts);

const port = process.env.PORT || 5007;

app.listen(port, () => console.log(`Server Running on port ${port}`));

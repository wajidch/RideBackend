const express = require("express");
const gravatar = require("gravatar");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Car = require("../../model/Cars");
router.get("/test", (req, res) =>
  res.json({ msg: "yeh dekho User kam kr rahy" })
);

router.post("/addCar", (req, res) => {


  const newCar = new Car({
    name: req.body.name,

    password: req.body.password,

  });
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newCar.password, salt, (err, hash) => {
      if (err) {
        throw err;
      } else {
        newCar.password = hash;
        newCar
          .save()
          .then(user => {
            res.json(user);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  });


});

router.get("/listOfCar", (req, res) => {

  Car.find()
    .then(carList => {
      res.json(carList)
    })




});
module.exports = router;

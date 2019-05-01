
const bcrypt = require("bcryptjs"),
  Cars = require("../../model/Cars"),
  Users = require("../../model/Users");


class CarsController {
  constructor(router) {
    router.get('/', this.getCars.bind(this));
    router.put('/:id', this.updateCar.bind(this));
    router.post('/', this.addCar.bind(this));
    router.delete('/:id', this.deleteCar.bind(this));
    router.post('/login', this.login.bind(this));
  }

  getCars(req, res) {
    console.log(`controllers/api/cars/getCars`);
    Cars.find((err, cars) => {
      if (err) {
        console.log(`getcars error: ${err}`);
      }
      res.json(cars);
    });
  }

  addCar(req, res) {
    console.log(`controllers/api/cars/addCar`);
    var postedCar = req.body;
    var car = new Cars();

    car.carNumber = postedCar.carNumber;
    car.user = postedCar.user;
    car.password = postedCar.password;

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(car.password, salt, (err, hash) => {
        if (err) {
          throw err;
        } else {
          car.password = hash;
          car.save((err, dbCar) => {
            if (err) {
              console.log(`addCar error: ${err}`);
            }
            console.log('**Car created**');
            Users.findById(postedCar.user._id.toString(), (err, dbUser) => {
              if (err) {
                console.log('*** addCar.findUser error: ' + err);
                res.json({ status: false, error: 'Update failed', car: null });
              }
              dbUser.carId = dbCar._id;
              dbUser.save((err, updatedUser) => {
                if (err) {
                  console.log(`addCar.updatedUser error: ${err}`);
                }
                console.log('**Car Assigned to ' + updatedUser.firstName);
                res.json(dbCar);
              });
            });

          });
        }
      });
    });
  }

  updateCar(req, res) {
    console.log(`controllers/api/cars/updateCar`);
    var postedCar = req.body;

    Cars.findById(req.params.id.toString(), (err, dbCar) => {
      if (err) {
        console.log('*** updateCar error: ' + err);
        res.json({ status: false, error: 'Update failed', car: null });
      }

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(postedCar.password, salt, (err, hash) => {
          if (err) {
            throw err;
          } else {
            dbCar.carNumber = postedCar.carNumber;
            dbCar.user = null;
            dbCar.user = postedCar.user;
            dbCar.password = hash;
            dbCar.save((err, updatedCar) => {
              if (err) {
                console.log(`updateCar error: ${err}`);
              }
              Users.findById(postedCar.user._id.toString(), (err, dbUser) => {
                if (err) {
                  console.log('*** updateCar.findUser error: ' + err);
                  res.json({ status: false, error: 'Update failed', car: null });
                }
                dbUser.carId = updatedCar._id;
                dbUser.save((err, updatedUser) => {
                  if (err) {
                    console.log(`updateCar.updatedUser error: ${err}`);
                  }
                  console.log('**Car Assigned to ' + updatedUser.firstName);
                  res.json(updatedCar);
                });
              });
            });
          }
        });
      });
    });
  }

  deleteCar(req, res) {
    console.log(`controllers/api/cars/deleteCar`);
    Cars.deleteOne({ '_id': req.params.id.toString() }, (err, deletedCar) => {
      if (err) {
        console.log(`deleteCar error: ${err}`);
        res.json(err);
      }
      console.log('**Delete Car OK**');
      res.json(deletedCar);
      // Drivers.deleteOne({ 'carId': req.params.id.toString() }, (err, deletedDriver) => {
      //   if (err) {
      //     console.log(`deleteCar.deleteDriver error: ${err}`);
      //     res.json(err);
      //   }
      //   console.log('**Delete Driver OK**');
      //   res.json(deletedCar);
      // }); 
    });
  }

  login(req, res) {
    var _self = this;
    console.log(`controllers/api/cars/login`);
    var postedCar = req.body;
    var car = new Cars();
    car.carNumber = postedCar.carNumber;
    car.password = postedCar.password;

    Cars.findOne({ 'carNumber': car.carNumber }, (err, dbCar) => {
      if (err) {
        console.log(`login error: ${err}`);
        res.json(err);
      }
      if (dbCar != null) {
        bcrypt.compare(car.password, dbCar.password, function (err, result) {
          if (result === true) {
            let carId = _self.getObjectId(dbCar._id).toString();
            Users.findOne({ 'carId': carId }, (err, dbUser) => {
              if (err) {
                console.log(`login.findUser error: ${err}`);
                res.json(err);
              }
              if (dbUser != null) {
                let data = {
                  car: dbCar,
                  user: dbUser
                }
                console.log('**Successfully Authenticated**');
                res.status(200).json({ status: true, error: null, obj: data });
              } else {
                console.log('**No user is assigned to this car**');
                res.status(401).json({ status: false, error: "No user is assigned to this car", obj: null });
              }

            });
          } else {
            console.log('Authentication error: Invalid username or password');
            res.status(401).json({ status: false, error: 'Authentication error: Invalid username or password', car: null });
          }
        });
      } else {
        console.log('Authentication error: Invalid username or password');
        res.status(401).json({ status: false, error: 'Authentication error: Invalid username or password', car: null });
      }


    });
  }

  getObjectId(Id) {
    var ObjectId = require('mongoose').Types.ObjectId;

    return new ObjectId(Id);
  }

}
module.exports = CarsController;
// router.get("/test", (req, res) =>
// res.json({ msg: "yeh dekho User kam kr rahy" })
// );

// router.post("/addCar", (req, res) => {


// const newCar = new Car({
//   name: req.body.name,

//   password: req.body.password,

// });
// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(newCar.password, salt, (err, hash) => {
//     if (err) {
//       throw err;
//     } else {
//       newCar.password = hash;
//       newCar
//         .save()
//         .then(user => {
//           res.json(user);
//         })
//         .catch(err => {
//           console.log(err);
//         });
//     }
//   });
// });


// });

// router.get("/listOfCar", (req, res) => {

// Car.find()
//   .then(carList => {
//     res.json(carList)
//   })

// });





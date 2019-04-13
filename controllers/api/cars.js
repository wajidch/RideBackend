const express = require("express");
const gravatar = require("gravatar");
//const router = express.Router();
const bcrypt = require("bcryptjs");
const Cars = require("../../model/Cars");


class CarsController{
    constructor(router){
      router.get('/', this.getCars.bind(this));
      router.put('/:id', this.updateCar.bind(this));
      router.post('/', this.addCar.bind(this));
      router.delete('/:id', this.deleteCar.bind(this));
    }

    getCars(req, res) {
      console.log(`controllers/api/cars/getCars`);
      Cars.find((err, cars) =>{
        if(err){
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
      car.password  = postedCar.password;
      
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(car.password, salt, (err, hash) => {
            if (err) {
              throw err;
            } else {
              car.password = hash;
              car.save((err, car)=>{
                if(err){
                  console.log(`addCar error: ${err}`);
                }
                res.json(car);
              });
            }
          });
        });
         
    }

    updateCar(req, res) { 
      console.log(`controllers/api/cars/updateCar`);
      var postedCar = req.body;
      
      Cars.findById(req.params.id.toString(),(err, dbCar)=>{
        if (err) {
          console.log('*** updateCar error: ' + err);
          res.json({ status: false, error: 'Update failed', car: null });
      } 
        dbCar.carNumber = postedCar.carNumber;
        dbCar.save((err, updatedCar)=>{
          if(err){
            console.log(`updateCar error: ${err}`);
          }
          res.json(updatedCar);
        }); 
      }) ;
    }
 
    deleteCar(req, res) { 
      console.log(`controllers/api/cars/deleteCar`);
      Cars.deleteOne({ '_id': req.params.id.toString() }, (err, deletedProduct) => {
        if(err){
          console.log(`deleteCar error: ${err}`);
          res.json(err);
        }
        res.json(deletedProduct);
    });    
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
 




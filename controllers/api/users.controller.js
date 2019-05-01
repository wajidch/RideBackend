
const Users = require("../../model/Users"),
      bcrypt = require("bcryptjs");


class UsersController {
  constructor(router) {
    router.get('/', this.getUsers.bind(this));
    router.get('/:id', this.getUser.bind(this));
    router.put('/:id', this.updateUser.bind(this));
    router.post("/", this.createUser.bind(this));
    router.delete('/:id', this.deleteUser.bind(this));
    router.post('/login', this.login.bind(this));
  }


  getUsers(req, res) {
    console.log(`controllers/api/users/getUsers`);
    Users.find((err, users) => {
      if (err) {
        console.log(`getUsers error: ${err}`);
        res.json(err);
      }
      console.log(`**get Users OK**`);
      res.json(users);
    });
  }


  getUser(req, res) {
    console.log(`controllers/api/users/getUser`);
    Users.findById(req.params.id.toString(), (err, dbUser) => {
      if (err) {
        console.log(`getUser error: ${err}`);
        res.json(err);
      }
      console.log(`**get User OK**`);
      res.json(dbUser);
    });
  }

  createUser(req, res) {
    console.log(`controllers/api/users/createUser`);
    var postedUser = req.body;
    var User = new Users();

    User.firstName = postedUser.firstName;
    User.lastName = postedUser.lastName;
    User.email = postedUser.email;
    // User.profileName = postedUser.profileName;
    // User.city = postedUser.city;
    // User.address = postedUser.address;
    // User.dob = postedUser.dob;
    User.status = "online";
    User.role = postedUser.role;
  
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(postedUser.password, salt, (err, hash) => {
        if (err) {
          throw err;
        } else {
          User.password = hash;
          User.save((err, createdUser) => {
            if (err) {
              res.json({ status: false, error: 'Update failed', car: null });
            }
            console.log('**create user OK**');
            res.json(createdUser);
          });
        }
      });
    });
   
  }

  updateUser(req, res) {
    console.log(`controllers/api/users/updateUser`);
    var postedUser = req.body;

    Users.findById(req.params.id.toString(), (err, dbUser) => {
      if (err) {
        console.log('*** updateUser error: ' + err);
        res.json({ status: false, error: 'Update failed', car: null });
      }

      dbUser.firstName = postedUser.firstName;
      dbUser.lastName = postedUser.lastName;
      dbUser.email = postedUser.email;
      dbUser.profileName = postedUser.profileName;
      dbUser.city = postedUser.city;
      dbUser.address = postedUser.address;
      dbUser.dob = postedUser.dob;
      dbUser.status = postedUser.status;
      dbUser.role = postedUser.role;

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(postedUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          } else {
            dbUser.password = hash;
            dbUser.save((err, updatedUser) => {
              if (err) {
                res.json({ status: false, error: 'Update failed', car: null });
              }
              console.log('**updateUser OK**');
              res.json(updatedUser);
            });
          }
        });
      }); 
    });

  }

  deleteUser(req, res) {
    console.log(`controllers/api/users/deleteUser`);
    Users.deleteOne({ '_id': req.params.id.toString() }, (err, deletedUser) => {
      if (err) {
        console.log(`deletedUser error: ${err}`);
        res.json(err);
      }
      console.log('**Delete User OK**');
      res.json(deletedUser);
    });
  }

  login(req, res) {
    console.log(`controllers/api/Users/login`);
    var postedUser = req.body;
    var user = new Users();
    user.email = postedUser.email;
    user.password = postedUser.password;

    Users.findOne({ 'email': user.email }, (err, dbUser) => {
      if (err) {
        console.log(`login error: ${err}`);
        res.json(err);
      }
      if (dbUser != null) {
        bcrypt.compare(user.password, dbUser.password, function (err, result) {
          if (result === true) {
            console.log('**Successfully Authenticated**');
            res.status(200).json({ status: true, error: null, user: dbUser });
          } else {
            console.log('Authentication error: Invalid email or password');
            res.status(401).json({ status: false, error: 'Authentication error: Invalid email or password', user: null });
          }
        });
      } else {
        console.log('Authentication error: Invalid email or password');
        res.status(401).json({ status: false, error: 'Authentication error: Invalid email or password', user: null });
      } 
    });
  }


}
module.exports = UsersController; 
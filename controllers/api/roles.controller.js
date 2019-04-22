
const Roles = require("../../model/Roles");


class RolesController {
  constructor(router) {
    router.get('/', this.getRoles.bind(this));
    router.get('/:id', this.getRole.bind(this));
    router.put('/:id', this.updateRole.bind(this));
    router.delete('/:id', this.deleteRole.bind(this));
  }


  getRoles(req, res) {
    console.log(`controllers/api/roles/getRoles`);
    Roles.find((err, roles) => {
      if (err) {
        console.log(`getRoles error: ${err}`);
        res.json(err);
      }
      console.log(`**get Roles OK**`);
      res.json(roles);
    });
  }
  

  getRole(req, res) {
    console.log(`controllers/api/roles/getRole`); 
      Roles.findById(req.params.id.toString(), (err, dbRole) => {
        if (err) {
          console.log(`getRole error: ${err}`);
          res.json(err);
        }
        console.log(`**get Role OK**`);
        res.json(dbRole);
      });  
  }

  updateRole(req, res) {
    console.log(`controllers/api/roles/updateRole`);
    var postedRole = req.body;

    Roles.findById(req.params.id.toString(), (err, dbRole) => {
      if (err) {
        console.log('*** updateRole error: ' + err);
        res.json({ status: false, error: 'Update failed', car: null });
      }
      dbRole.name = postedRole.name;
      dbRole.save((err, updatedRole) => {
        if (err) {
          res.json({ status: false, error: 'Update failed', car: null });
        }
        res.json(updatedRole);
      });
    });

  }

  deleteRole(req, res) {
    console.log(`controllers/api/roles/deleteRole`);
    Roles.deleteOne({ '_id': req.params.id.toString() }, (err, deleteRole) => {
      if (err) {
        console.log(`deleteRole error: ${err}`);
        res.json(err);
      }
      console.log('**Delete Role OK**');
      res.json(deleteRole);
    });
  }

 
}
module.exports = RolesController; 
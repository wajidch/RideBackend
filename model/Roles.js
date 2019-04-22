const mongoose = require('mongoose'),
      Schema   = mongoose.Schema;


const RolesScheema = new Schema({
    name: { type: String, trim: true}
});

module.exports = Roles = mongoose.model("roles",RolesScheema);

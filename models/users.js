const fire = require('./lib/firebase');
const fs = require('fs');

const staffController = fire.staffController;
const maintenanceController = fire.maintenanceController;

function Users(firstname, lastname, username, passkey, email, role, presence, phone, uid) {

  this.firstname = firstname;
  this.lastname = lastname;
  this.username = username;
  this.passkey = passkey;
  this.email = email;
  this.role = role || "staff";
  this.presence = presence;
  this.phone = phone;
  this.uid = uid;

}


Users.prototype.addNewUser = function(staff, callback) {
  function(staff) {

    staffController.once("value", function(snapshot) {
      staffController.push({
        staff
      });
      getAvailableStaff();

    }, function(error) {
      callback("Error: " + error.code);
    });
  }
};

User.prototype.getUsers = function(staff) {

  var allStaff = [];
  var notestring = fs.readFileSync('./assets/staff_raw.json');
  var bn = JSON.parse(notestring);
  var keys = Object.keys(bn);
  var arr = [];

  //console.log(keys);
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];

    arr.push(bn[k].staff);
    allStaff = arr.filter(function() {
      return bn[k].staff.name !== null;
    });
    //console.log(JSON.stringify(allStaff));
  }
  fs.writeFileSync("./assets/staff.json", JSON.stringify(allStaff));
  fire.getAvailableStaff();

}


Users.prototype.deleteUser = function(staff, callback) {
  // body...
};

Users.prototype.signIn = function(staff, callback) {
  // body...
}

Users.prototype.signOut = function(callback) {


}

module.exports = {
  Users
}

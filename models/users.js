const fire = require('../lib/firebase');
const fs = require('fs');

const staffController = fire.staffController;


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

};

Users.prototype.getUsers = function(staff,callback) {

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

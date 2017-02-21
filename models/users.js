function Users(firstname,lastname,username,passkey,email,role,presence){

  this.firstname = firstname;
  this.lastname = lastname;
  this.username = username;
  this.passkey = passkey;
  this.email = email;
  this.role = role || "staff";
  this.presence = presence || true;

}


Users.prototype.addNewUser = function (staff,callback) {
  // body...
};

Users.prototype.deleteUser = function (staff,callback) {
  // body...
};

Users.prototype.signIn = function (staff,callback) {
  // body...
}

Users.prototype.signOut = function(callback){


}

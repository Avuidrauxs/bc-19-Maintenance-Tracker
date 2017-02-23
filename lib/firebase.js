const firebase = require('firebase');
const fs = require('fs');


const user = require('../models/users');
const maintenance = require('../models/maintenance');
const synchronize = require('sync');




//( Initialize Firebase
var config = {
  apiKey: "AIzaSyCQKpIXtxiu-U0f8xb7JurpZrPETJQ2Wyo",
  authDomain: "maintenancetest-f45a7.firebaseapp.com",
  databaseURL: "https://maintenancetest-f45a7.firebaseio.com",
  storageBucket: "maintenancetest-f45a7.appspot.com",
  messagingSenderId: "389037482479"
};
firebase.initializeApp(config);


//saves to a particular table in my testproject DB
var staffController = firebase.database().ref('staffList');
var maintenanceController = firebase.database().ref('work');
//userRef = ref.child("work");

var staff = new user.Users('Audax', 'Sool', 'Part', '2323ty', 'banku2323@skin.com', 'st23a', false, "0248236675", "dsif9iu heiuf");
var mainte = new maintenance.Maintenance(001, 'Car repair', '11/11/2016', 78, 'high', 'maintenance', false, "Pretty shitty work", null);


//Checking database
var connectedRef = firebase.database().ref(".info/connected");
var checkConnection = function() {

  connectedRef.on("value", function(snap) {
    if (snap.val() === true) {
      alert("connected");
    } else {
      alert("not connected");
    }
  });
}


var requestFixKeyExists = function() {
  var data = JSON.parse(fs.readFileSync('./assets/requests_raw.json'));

  for (staff in data) {
    data[staff].mainte.fKey = staff;

  }
  fs.writeFileSync("./assets/requests_raw.json", JSON.stringify(data));

};
//requestFixKeyExists();

var userFixKeyExists = function() {
  var data = JSON.parse(fs.readFileSync('./assets/staff_raw.json'));

  for (staffs in data) {
    data[staffs].staff.uid = staffs;

  }
  fs.writeFileSync("./assets/staff_raw.json", JSON.stringify(data));

};

//console.log(checkIfKeyExists());
//userFixKeyExists();
var removeStaffOffline = function(staff) {

  var tempArray = fs.readFileSync('./assets/staff.json');
  tempArray = JSON.parse(tempArray);

  var tempPresent = tempArray.filter(function(astaff) {
    return astaff.username !== staff.username
  });

  fs.writeFileSync("./assets/staff.json", JSON.stringify(tempPresent));

  return tempArray.length !== tempPresent.length;



}

var removeRequestOffline = function(mainte) {

  var tempArray = fs.readFileSync('./assets/requests.json');
  tempArray = JSON.parse(tempArray);
  var maint = new maintenance.Maintenance();
  var tempPresent = tempArray.filter(function(maint) {
    return maint.title !== mainte
  });

  fs.writeFileSync("./assets/requests.json", JSON.stringify(tempPresent));

  return tempArray.length !== tempPresent.length;


}
//saves Staff memeber
var saveNewStaff = function(staff) {

  staffController.once("value", function(snapshot) {
    staffController.push({
      staff
    });
    userFixKeyExists();
    getAvailableStaff();

  }, function(error) {
    console.log("Error: " + error.code);
  });
}
//Saves Maintenance
var saveNewMaintenanceRequest = function(mainte) {

  maintenanceController.once("value", function(snapshot) {
    maintenanceController.push({
      mainte
    });
    requestFixKeyExists();
    getTotalMaintenanceRepairs();

  }, function(error) {
    console.log("Error: " + error.code);
  });
}


var getTotalMaintenanceRepairs = function() {

  maintenanceController.on("value", function(snapshot) {
    var allRequests = snapshot.val();
    fs.writeFileSync("./assets/requests_raw.json", JSON.stringify(allRequests));

  }, function(error) {
    console.log("Error: " + error.code);
  });

}



var getAvailableStaff = function() {

  staffController.on("value", function(snapshot) {
    var allStaff = snapshot.val();
    fs.writeFileSync("./assets/staff_raw.json", JSON.stringify(allStaff));

  }, function(error) {
    console.log("Error: " + error.code);
  });

}


var getAllCurrentRepairs = function ()
{
  var allRequests = 0;
  var data = JSON.parse(fs.readFileSync('./assets/requests_raw.json'));

  for (staffs in data) {
    if(data[staffs].mainte.active && data[staffs].mainte.type === "repair"){++allRequests;}
}

  getTotalMaintenanceRepairs();
  requestFixKeyExists();

  return allRequests;
}
var getAllRequestsOffline = function(mainte) {

  var allRequests = 0;
  var data = JSON.parse(fs.readFileSync('./assets/requests_raw.json'));

  for (staffs in data) {
  ++allRequests;
}

  getTotalMaintenanceRepairs();
  requestFixKeyExists();

  return allRequests;
}

var getAllStaffOffline = function() {
  var data = JSON.parse(fs.readFileSync('./assets/staff_raw.json'));
  var allStaff = 0;
  for (staffs in data) {
  if(data[staffs].staff.presence===true){++allStaff;}
}

  getAvailableStaff();
  userFixKeyExists();
  return allStaff;

}
var getAllCurrentMaintenance = function()
{
  var allRequests = 0;
  var data = JSON.parse(fs.readFileSync('./assets/requests_raw.json'));

  for (staffs in data) {
    if(data[staffs].mainte.active && data[staffs].mainte.type === "maintenance"){++allRequests;}
}

  getTotalMaintenanceRepairs();
  requestFixKeyExists();

  return allRequests;

}

//console.log(getAllCurrentMaintenance())
module.exports = {
  getAllRequestsOffline,
  saveNewStaff,
  saveNewMaintenanceRequest,
  getAllStaffOffline,
  getAllCurrentMaintenance,
  getAllCurrentRepairs,
  removeStaffOffline,
  removeRequestOffline



}

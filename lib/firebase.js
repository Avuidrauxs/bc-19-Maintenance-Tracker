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


var connectedRef = firebase.database().ref(".info/connected");

var checkConnection = function(callback) {
  connectedRef.on("value", function(snap) {
    if (snap.val() === true) {
      callback(undefined, true);
    } else {
      callback(false);
    }
  });
}

//saves to a particular table in my testproject DB
var staffController = firebase.database().ref('staffList');
var maintenanceController = firebase.database().ref('work');

var getTotalMaintenanceRepairs = function(err) {

  maintenanceController.on("value", function(snapshot) {
      var allRequests = snapshot.val();
      fs.writeFileSync("./assets/requests_raw.json", JSON.stringify(allRequests));

    }

    ,
    function(error) {
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




module.exports = {

  getAvailableStaff,
  getTotalMaintenanceRepairs


}

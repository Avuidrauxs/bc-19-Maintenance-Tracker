const firebase = require('firebase');
const user = require('../models/users');
const maintenance  = require('../models/maintenance');
const synchronize = require('sync');
const fs = require('fs');



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
var ref = firebase.database().ref('staffList');
var mainteRef = firebase.database().ref('work');
//userRef = ref.child("work");

var staff = new user.Users('Audax','Sool','Par','2323ty','banku2323@skin.com','st23a',false,"0248236675","dsif9iu heiuf");
var mainte = new maintenance.Maintenance(001,'Car repair','11/11/2016',78,'high','maintenance',false,"Pretty shitty work",null);
//SAVING INTO DATABASE

//saves Staff memeber
var saveNewStaff = function (staff) {

ref.once("value", function(snapshot) {
  ref.push({
      staff
  });
  getAvailableStaff();

}, function (error) {
   console.log("Error: " + error.code);
});
}
//Saves Maintenance
var saveNewMaintenanceRequest = function (mainte) {

mainteRef.once("value", function(snapshot) {
  mainteRef.push({
      mainte
  });
  getTotalMaintenanceRepairs();

   console.log("Error: " + error.code);
});
}


var getTotalMaintenanceRepairs = function (){

  mainteRef.on("value", function(snapshot) {
     var allRequests = snapshot.val();
     fs.writeFileSync("./assets/requests_raw.json",JSON.stringify(allRequests));

  }, function (error) {
     console.log("Error: " + error.code);
  });

}

var getAvailableStaff = function (){

  ref.on("value", function(snapshot) {
     var allStaff = snapshot.val();
     fs.writeFileSync("./assets/staff_raw.json",JSON.stringify(allStaff));

  }, function (error) {
     console.log("Error: " + error.code);
  });

}


var getAllRequestsOffline = function (mainte) {

  var allRequests = [];
  var notestring = fs.readFileSync('./assets/requests_raw.json');
  var bn = JSON.parse(notestring);
  var keys = Object.keys(bn);
  var arr = [];

  //console.log(keys);
  for(var i =0;i < keys.length;i++){
    var k = keys[i];

   arr.push(bn[k].mainte);
   allRequests = arr.filter(function () {
     return bn[k].mainte.title !== null;
   });
}
    fs.writeFileSync("./assets/requests.json",JSON.stringify(allRequests));
   getTotalMaintenanceRepairs();
}

var getAllStaffOffline = function (staff) {

  var allStaff = [];
  var notestring = fs.readFileSync('./assets/staff_raw.json');
  var bn = JSON.parse(notestring);
  var keys = Object.keys(bn);
  var arr = [];

  //console.log(keys);
  for(var i =0;i < keys.length;i++){
    var k = keys[i];

   arr.push(bn[k].staff);
   allStaff = arr.filter(function () {
     return bn[k].staff.name !== null;
   });
   //console.log(JSON.stringify(allStaff));
  }

  fs.writeFileSync("./assets/staff.json",JSON.stringify(allStaff));
  getAvailableStaff();

}
//saveNewMaintenanceRequest(mainte);
//getAvailableStaff();
//getAllStaffOffline();
//getTotalMaintenanceRepairs();
    //getAllRequestsOffline();
module.exports ={
  getAllRequestsOffline,
  saveNewStaff,
  saveNewMaintenanceRequest,
  getAllStaffOffline

}

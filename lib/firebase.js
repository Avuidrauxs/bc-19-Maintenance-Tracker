const firebase = require('firebase');
const user = require('../models/users');
const maintenance  = require('../models/maintenance');
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
var ref = firebase.database().ref('staffList');
var mainteRef = firebase.database().ref('work');
//userRef = ref.child("work");

var staff = new user.Users('John','SpringRoll','Dollar','qwerty','banku@skin.com','sta',true,"0248236675","dsif9iu heiuf");
var mainte = new maintenance.Maintenance(001,'Car repair','11/11/2016',78,'high','mainte',true,"Pretty shitty work");
//SAVING INTO DATABASE

//saves Staff memeber
var saveNewStaff = function (staff) {

ref.once("value", function(snapshot) {
  ref.push({
      staff
  });
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
}, function (error) {
   console.log("Error: " + error.code);
});
}

//Retriving data of all staff members
// ref.on("value", function(snapshot) {
//    var bn = snapshot.val();
//    var keys = Object.keys(bn);
//    var arr = [];
//    //console.log(keys);
//    for(var i =0;i < keys.length;i++){
//      var k = keys[i];
//     //  console.log(`${bn[k]}\n${bn[k]}`);
//     //console.log(`${JSON.stringify(bn[k].staff)}`);
//     arr.push(bn[k].staff);
//     abb = arr.filter(function () {
//       return bn[k].staff.presence === true;
//     });
//     console.log(abb.length);
//    }
// }, function (error) {
//    console.log("Error: " + error.code);
// });

var getTotalMaintenanceRepairs = function (str){
  var abb = [];
  mainteRef.on("value", function(snapshot) {
     var bn = snapshot.val();
     var keys = Object.keys(bn);
     var arr = [];

     //console.log(keys);
     for(var i =0;i < keys.length;i++){
       var k = keys[i];
      //  console.log(`${bn[k]}\n${bn[k]}`);
      //console.log(`${JSON.stringify(bn[k].staff)}`);
      arr.push(bn[k].mainte);
      abb = arr.filter(function () {
        return bn[k].mainte.type === str;
      });
      //console.log(abb.length);
     }
  }, function (error) {
     console.log("Error: " + error.code);
  });
  return abb.length;
}

var getAvailableStaff = function (){
  var abb = [];
  ref.on("value", function(snapshot) {
     var bn = snapshot.val();
     var keys = Object.keys(bn);
     var arr = [];

     //console.log(keys);
     for(var i =0;i < keys.length;i++){
       var k = keys[i];
      //  console.log(`${bn[k]}\n${bn[k]}`);
      //console.log(`${JSON.stringify(bn[k].staff)}`);
      arr.push(bn[k].staff);
      abb = arr.filter(function () {
        return bn[k].staff.presence === true;
      });
      //console.log(abb.length);
     }
  }, function (error) {
     console.log("Error: " + error.code);
  });
  return abb.length;
}

var getPendingRequests = function () {
  var abb = [];
  mainteRef.on("value", function(snapshot) {
     var bn = snapshot.val();
     var keys = Object.keys(bn);
     var arr = [];

     //console.log(keys);
     for(var i =0;i < keys.length;i++){
       var k = keys[i];
      //  console.log(`${bn[k]}\n${bn[k]}`);
      //console.log(`${JSON.stringify(bn[k].staff)}`);
      arr.push(bn[k].mainte);
      abb = arr.filter(function () {
        return bn[k].mainte.active === true;
      });
      //console.log(abb.mainte);
     }
  }, function (error) {
     console.log("Error: " + error.code);
  });
  return abb;
  //console.log(abb);
}

//getPendingRequests();
//saveNewMaintenanceRequest(mainte);
// console.log(synchronize(getTotalMaintenance()));
// console.log(getTotalMaintenance());
//console.log(dd);

module.exports ={
  getTotalMaintenanceRepairs,
  saveNewStaff,
  saveNewMaintenanceRequest,
  getAvailableStaff,
  getPendingRequests
}

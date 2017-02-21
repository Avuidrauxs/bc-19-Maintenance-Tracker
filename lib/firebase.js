const firebase = require('firebase');
const user = require('../models/users');
const maintenance  = require('../models/maintenance');
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
var mainte = new maintenance.Maintenance(001,'Car repair','11/11/2016',78,'high','repair',true,"Pretty shitty work");
//SAVING INTO DATABASE

//saves Staff memeber
ref.once("value", function(snapshot) {
  ref.push({
      staff
  });
}, function (error) {
   console.log("Error: " + error.code);
});

//Saves Maintenance
mainteRef.once("value", function(snapshot) {
  mainteRef.push({
      mainte
  });
}, function (error) {
   console.log("Error: " + error.code);
});

//Retrieving all data
// userRef.on("value", function(snapshot) {
//    console.log(snapshot.val());
// }, function (error) {
//    console.log("Error: " + error.code);
// });

//console.log("Successful");

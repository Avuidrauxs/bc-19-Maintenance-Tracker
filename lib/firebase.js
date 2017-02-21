const firebase = require('firebase');
const user = require('../models/users');

// Initialize Firebase
 var config = {
   apiKey: "AIzaSyDy2sBl6BYW_AnquHtUkmP2afPVEnLdH_w",
   authDomain: "test-project-42673.firebaseapp.com",
   databaseURL: "https://test-project-42673.firebaseio.com",
   storageBucket: "test-project-42673.appspot.com",
   messagingSenderId: "503630087854"
 };
 firebase.initializeApp(config);


//saves to a particular table in my testproject DB
var ref = firebase.database().ref('messages/');
userRef = ref.child("-KdSo4mj1t42ZFq__PJG");

var admin = new user.Users('John','SpringRoll','Dollar','qwerty','banku@skin.com','sta',true);
var o;
//SAVING INTO DATABASE
ref.once("value", function(snapshot) {
   if(!snapshot.hasChild(admin.lastname)){
     userRef.set({
         admin
     });
   }else {
     {
       console.log('User already exists');
     }
   }
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

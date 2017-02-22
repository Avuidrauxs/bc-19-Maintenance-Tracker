const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const fire = require('./lib/firebase');

const staff = require('./models/users');
const maintenance = require('./models/maintenance')
var app = express();

//registering partials
hbs.registerPartials(__dirname + '/views/partials');

//registr helper to run functions
hbs.registerHelper('randomize100',function () {
  return randomize100();

});

//Gets total number of current pending maintenance
hbs.registerHelper('getCurrentPendingMainte',function () {

  return getCurrentPendingMainte();
});

//Get all maintenance requests
hbs.registerHelper('getAllCurrentMaintenance',function () {

  return getAllCurrentMaintenance();
});

//Get total available repairmen
hbs.registerHelper('getCurrentAvailableStaff',function () {

  return getCurrentAvailableStaff();
});

//Get total repair requests in view
hbs.registerHelper('getAllCurrentRepairs',function () {

  return getAllCurrentRepairs();
});

//Get all Repair requests
function getAllCurrentRepairs(argument) {

  var allRequest = [];
  var notestring = fs.readFileSync('./assets/requests.json');
  var bn = JSON.parse(notestring);


  var aRequest = new maintenance.Maintenance();

   allRequest = bn.filter(function (aRequest) {
     return aRequest.active === true && aRequest.type === "repair";
   });
   //console.log(JSON.stringify(allStaff));
   fire.getAllRequestsOffline();
  return allRequest.length;
}


//get all Maintenance requests

function getAllCurrentMaintenance() {

    var allRequest = [];
    var notestring = fs.readFileSync('./assets/requests.json');
    var bn = JSON.parse(notestring);


    var aRequest = new maintenance.Maintenance();

     allRequest = bn.filter(function (aRequest) {
       return aRequest.active === true && aRequest.type === "maintenance";
     });
     //console.log(JSON.stringify(allStaff));
     fire.getAllRequestsOffline();
    return allRequest.length;


}
//get Pending Maintenance requests
function getCurrentPendingMainte(){

  var allRequest = [];
  var notestring = fs.readFileSync('./assets/requests.json');
  var bn = JSON.parse(notestring);


  var aRequest = new maintenance.Maintenance();

   allRequest = bn.filter(function (aRequest) {
     return aRequest.active === false;
   });
   //console.log(JSON.stringify(allStaff));
   fire.getAllRequestsOffline();
  return allRequest.length;

}
//get current available staff
function getCurrentAvailableStaff(){

  var allStaff = [];
  var notestring = fs.readFileSync('./assets/staff.json');
  var bn = JSON.parse(notestring);


  var astaff = new staff.Users();

   allStaff = bn.filter(function (astaff) {
     return astaff.presence === true;
   });
   //console.log(JSON.stringify(allStaff));
   fire.getAllStaffOffline();
  return allStaff.length;
}

// hbs.registerHelper('getPendingRequests',function () {
//
//   return fire.getPendingRequests();
// });
//set engine for template viewing
app.set('view engine','hbs');

//set middleware for routing
app.use(express.static(__dirname+'/'));

// app.use(function(req,res,next){
//
//     res.render('pages/blank.hbs');
//
// });
//routing to pages

app.get('/',function (req,res) {
  res.render('index.hbs',{

    name: "Audax Main Dashboard",
    username : 'Audax' || 'User'


  });
});

app.get('/login',function (req,res) {
  res.render('pages/login.hbs');
});


app.get('/blank',function (req,res) {
  res.render('pages/blank.hbs');
});

app.get('/add_new_user',function (req,res) {
  res.render('pages/forms.hbs',{

    name: "Audax Main Dashboard",
    username : 'Audax' || 'User',
    form_visibility : 0,
    main_form_visibility : 'hidden'


  });
});

app.get('/add_new_request',function (req,res) {
  res.render('pages/forms.hbs',{

    name: "Audax Main Dashboard",
    username : 'Audax' || 'User',
    form_visibility : 'hidden',
    main_form_visibility : null


  });
});

app.post('/',function (req,res,next) {
  res.send('It was ayt');
})

app.listen(2009,function () {
  console.log("Runnning on port : 2009");
});

function randomize100() {
  return Math.floor(Math.random() * 10);
}

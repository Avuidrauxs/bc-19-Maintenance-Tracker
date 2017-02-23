const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');

const fire = require('./lib/firebase');

const staff = require('./models/users');
const maintenance = require('./models/maintenance')
var app = express();
const _ = require('underscore')


var client = require('twilio')('AC091131669be0f4199fb5066ac999a618', '2f2dfc3b66a8dc580c92b15273e83679');

//registering partials
hbs.registerPartials(__dirname + '/views/partials');

//registr helper to run functions
hbs.registerHelper('getPresentStaffList', function() {
  return getPresentStaffList();

});

//Gets total number of current pending maintenance
hbs.registerHelper('getCurrentPendingMainte', function() {

  return getCurrentPendingMainte();
});

//Get all maintenance requests
hbs.registerHelper('getAllCurrentMaintenance', function() {

  return getAllCurrentMaintenance();
});

//Get total available repairmen
hbs.registerHelper('getCurrentAvailableStaff', function() {

  return getCurrentAvailableStaff();
});

//Get total repair requests in view
hbs.registerHelper('getAllCurrentRepairs', function() {

  return getAllCurrentRepairs();
});

//Get all Repair requests
function getAllCurrentRepairs(argument) {

  var allRequest = [];
  var notestring = fs.readFileSync('./assets/requests.json');
  var bn = JSON.parse(notestring);


  var aRequest = new maintenance.Maintenance();

  allRequest = bn.filter(function(aRequest) {
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

  allRequest = bn.filter(function(aRequest) {
    return aRequest.active === true && aRequest.type === "maintenance";
  });
  //console.log(JSON.stringify(allStaff));
  fire.getAllRequestsOffline();
  return allRequest.length;


}
//get Pending Maintenance requests
function getCurrentPendingMainte() {

  var allRequest = [];
  var notestring = fs.readFileSync('./assets/requests.json');
  var bn = JSON.parse(notestring);


  var aRequest = new maintenance.Maintenance();

  allRequest = bn.filter(function(aRequest) {
    return aRequest.active === false;
  });
  //console.log(JSON.stringify(allStaff));
  fire.getAllRequestsOffline();
  return allRequest.length;

}
//get current available staff
function getCurrentAvailableStaff() {

  var allStaff = [];
  var notestring = fs.readFileSync('./assets/staff.json');
  var bn = JSON.parse(notestring);


  var astaff = new staff.Users();

  allStaff = bn.filter(function(astaff) {
    return astaff.presence === true;
  });
  //console.log(JSON.stringify(allStaff));
  fire.getAvailableStaff();
  return allStaff.length;
}

function getPresentStaffList() {
  var allStaff = [];
  var notestring = "";
  notestring = fs.readFileSync('./assets/staff.json');
  // notestring = notestring.toString().replace(/&quot;/g, '"');
  allStaff = JSON.parse(notestring);
  // allStaff.forEach(staff => { console.log(_.pick(allStaff, ['username']))});
  //  return JSON.stringify(allStaff);
  return allStaff
}
// getPresentStaffList();
// hbs.registerHelper('getPendingRequests',function () {
//
//   return fire.getPendingRequests();
// });
//set engine for template viewing
app.set('view engine', 'hbs');
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));


//set middleware for routing
app.use(express.static(__dirname + '/'));

// app.use(function(req,res,next){
//
//     res.render('pages/blank.hbs');
//
// });
//routing to pages

app.get('/', function(req, res) {
  res.render('index.hbs', {

    name: "Audax Main Dashboard",
    username: 'Audax' || 'User'


  });
});

app.get('/login', function(req, res) {
  res.render('pages/login.hbs');
});


app.get('/blank', function(req, res) {
  res.render('pages/blank.hbs');
});

app.get('/add_new_user', function(req, res) {
  res.render('pages/forms.hbs', {

    name: "Audax Main Dashboard",
    username: 'Audax' || 'User',
    form_visibility: 0,
    main_form_visibility: 'hidden'


  });
});


var i = 0;
var arr = getPresentStaffList().map(function(staff) {
  return `${staff.username}`;
});


app.get('/add_new_request', function(req, res) {

  res.render('pages/forms.hbs', {

    name: "Audax Main Dashboard",
    username: 'Audax' || 'User',
    form_visibility: 'hidden',
    main_form_visibility: null,
    staffObject: new staff.Users(),
    allStaff: arr


  });
});

app.post('/banana', function(req, res, next) {
  res.send(`Title :${req.body.reqTitle} \n
            Date : ${req.body.reqDate}\n
            imgURL :     ${req.body.reqimgURL}\n
            Comments  :    ${req.body.reqComment}\n
            Priorty  :    ${req.body.reqPriorty}\n
            Type :      ${req.body.reqType}`);
  var mainte = new maintenance.Maintenance(
    req.body.reqID,
    req.body.reqTitle,
    req.body.reqDate,
    "Kwaku",
    req.body.reqPriorty,
    req.body.reqType,
    false,
    req.body.reqComment,
    req.body.reqimgURL
  );
  fire.saveNewMaintenanceRequest(mainte);
  //req.body.reqStaff
});

//SAVES NEW STAFF
app.post('/welcome', function(req, res, next) {
  var pass = bcrypt.hashSync(req.body.email, 5);
  var tempArray = fire.getAllStaffOffline();
  var istaff = new staff.Users();
  var astaff = new staff.Users(req.body.fname,
    req.body.lname,
    req.body.uname,
    pass,
    req.body.email,
    req.body.role,
    req.body.presence,
    req.body.phone,
    "0000ffff"
  );
  var duplicates = tempArray.filter(function(istaff) {
    return istaff.username === astaff.username
  });

  if (duplicates.length === 0) {
    tempArray.push(astaff);
    fs.writeFileSync("./assets/staff.json", JSON.stringify(tempArray));
    fire.saveNewStaff(astaff);
    sendSMS(astaff);
    res.send("Sent");
  } else {
    res.send("Not sent");
  }
});
'+2348073021620'

function sendSMS(staff) {
  client.messages.create({
    from: '+15409083889',
    to: staff.phone,
    body: `${staff.username}, a maintenance task has been assigned to you`
  }, function(err, message) {
    if (err) {
      console.error('Error ' + err.message);
    }
  });
}
//sendSMS();
app.listen(2009, function() {
  console.log("Runnning on port : 2009");
});

function randomize100() {
  return Math.floor(Math.random() * 10);
}

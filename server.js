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
// hbs.registerHelper('getPresentStaffList', function() {
//   return getPresentStaffList();
//
// });

//remove pending requests
hbs.registerHelper('removeRequestOffline', function(title) {
  return fire.removeRequestOffline(title);

});

//Gets total number of current pending maintenance
hbs.registerHelper('getCurrentPendingMainte', function() {

  return fire.getAllRequestsOffline();
});

//Get all maintenance requests
hbs.registerHelper('getAllCurrentMaintenance', function() {

  return fire.getAllCurrentMaintenance();
});

//Get total available repairmen
hbs.registerHelper('getCurrentAvailableStaff', function() {

  return fire.getAllStaffOffline();
});

//Get total repair requests in view
hbs.registerHelper('getAllCurrentRepairs', function() {

  return fire.getAllCurrentRepairs();
});

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
    username: 'Audax' || 'User',
    visible: ""

    }

  );
});

app.get('/user', function(req, res) {
  res.render('user.hbs', {

    name: req.body.username + " Main Dashboard",
    username: req.body.username || 'User'


  });
});

app.get('/user/add_new_request', function(req, res) {
  res.render('pages/userforms.hbs', {

    name: req.body.username + " Main Dashboard",
    username: req.body.username || 'User'


  });
});

app.get('/login', function(req, res) {
  res.render('pages/login.hbs');
});

app.get('/logout', function(req, res) {
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




app.get('/add_new_request', function(req, res) {

  res.render('pages/forms.hbs', {

    name: "Audax Main Dashboard",
    username: 'Audax' || 'User',
    form_visibility: 'hidden',
    main_form_visibility: null,
    staffObject: new staff.Users(),



  });
});
app.get('/uadd_new_request', function(req, res) {

  res.render('pages/userforms.hbs', {

    name: "User Main Dashboard",
    username: 'User',
    form_visibility: 'hidden',
    main_form_visibility: null,
    staffObject: new staff.Users()



  });
});

//Authenticate Login
app.post('/auth', function(req, res) {
  if (req.body.username === "admin" && req.body.password === "admin") {
    res.redirect('/');

  } else if (req.body.username === "user" && req.body.password === "user") {
    res.redirect('/user');

    //res.render('user.hbs')
  } else {
    //res.send('alert("Wrong")');
    res.render('pages/login.hbs')
  }
});
//save new request
app.post('/success', function(req, res, next) {
  res.send();
  var mainte = new maintenance.Maintenance(
    req.body.reqID,
    req.body.reqTitle,
    req.body.reqDate,
    "Kwaku",
    req.body.reqPriorty,
    req.body.reqType,
    false,
    req.body.reqComment,
    req.body.reqimgURL,
    null
  );
  fire.saveNewMaintenanceRequest(mainte);
  //req.body.reqStaff
});
//Request save ends here

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

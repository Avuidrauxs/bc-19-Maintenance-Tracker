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

var port = process.env.PORT || 2009;


var client = require('twilio')('AC091131669be0f4199fb5066ac999a618', '2f2dfc3b66a8dc580c92b15273e83679');

//registering partials
hbs.registerPartials(__dirname + '/views/partials');

//registr helper to run functions
// hbs.registerHelper('getPresentStaffList', function() {
//   return getPresentStaffList();
//
// });

//remove pending requests
hbs.registerHelper('deleteManRep', function() {


  var data = JSON.parse(fs.readFileSync('./assets/requests_raw.json'));
  var daff;
  for (staffs in data) {


    daff = staffs;

  }
  return fire.deleteManRep(daff);


  //console.log(mant_uid);

});


//update pending requests
hbs.registerHelper('updateManRep', function() {


  var data = JSON.parse(fs.readFileSync('./assets/requests_raw.json'));

  for (staffs in data) {

    if (data[staffs].mainte.active === false) {
      return fire.updateManRep(staffs);
    }


  }


});

hbs.registerHelper('updateManRep', function(str) {

  return fire.updateManRep(str);
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

// app.get('/user/add_new_request', function(req, res) {
//   res.render('pages/userforms.hbs', {
//
//     name: req.body.username + " Main Dashboard",
//     username: req.body.username || 'User'
//
//
//   });
// });

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
    form_visibility: null,
    main_form_visibility: ''


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
    "Repairman 1",
    req.body.reqPriorty,
    req.body.reqType,
    req.body.reqComment,
    req.body.reqimgURL,
    null,
    false,
    false,
    new Date().getTime()



  );
  if (!fire.duplicateRequests(req.body.reqID)) {
    fire.saveNewMaintenanceRequest(mainte);
    res.send("<html><script>alert('New user saved')</script></html>");
    res.redirect('/');
  } else {

    res.send("<html><script>alert('Save failed')</script></html>");
    res.redirect('/add_new_request')
  }
  //req.body.reqStaff
});

app.get('/ben?str=faaaa', function(req, res, nexr) {

  res.send(req.params('str'));

});



//Request save ends here
//SAVE REQUEST BEGINS
app.post('/main_request', function(req, res, next) {
  res.send();
  var mainte = new maintenance.Maintenance(
    req.body.reqID,
    req.body.reqTitle,
    "Kwaku",
    req.body.reqPriorty,
    req.body.reqType,
    req.body.reqComment,
    req.body.reqimgURL,
    null,
    false,
    false,
    new Date().getTime()
  );
  if (!fire.duplicateRequests(req.body.reqID)) {
    fire.saveNewMaintenanceRequest(mainte);
    res.send("SENT");
    res.redirect('/user');
  } else {

    //  res.send("<html><script>alert('Save failed')</script></html>");
    res.send(" NOT SENT");
    res.redirect('/user')
  }

  //req.body.reqStaff
});



//SAVES NEW STAFF
app.post('/new_staff', function(req, res, next) {


  var istaff = new staff.Users();
  var astaff = new staff.Users(req.body.fname,
    req.body.lname,
    req.body.uname,
    'pass',
    req.body.email,
    req.body.role,
    req.body.presence,
    req.body.phone,
    "0000ffff"
  );



  if (!fire.duplicateStaff(req.body.uname)) {
    fire.saveNewStaff(astaff);
    sendSMS(astaff.phone);
    res.send("SENT");
    res.redirect('/')
  } else {

    //res.send("<html><script>alert('Save failed')</script></html>");
    res.redirect('/add_new_user')
  }
});
'+2348073021620'

function sendSMS(staff) {
  client.messages.create({
    from: '+15409083889',
    to: '+2348073021620',
    body: `${staff}, a maintenance task has been assigned to you`
  }, function(err, message) {
    if (err) {
      console.error('Error ' + err.message);
    }
  });
}
//sendSMS();
app.listen(port, function() {
  console.log(`Runnning on port :${port}`);
});

function randomize100() {
  return Math.floor(Math.random() * 10);
}

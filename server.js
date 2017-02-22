const express = require('express');
const hbs = require('hbs');

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


//Gets total number of requests
hbs.registerHelper('getTotalMaintenanceRepairs',function () {

  return fire.getTotalMaintenanceRepairs('maintenance');
});
var abb = [2,3,4,5,6];
//abb = fire.getAvailableStaff();
var bar = abb.filter(function (staff) {
  return staff.active === true;
});
//Get total available repairmen
hbs.registerHelper('getAvailableStaff',function () {

  return bar.length
});

hbs.registerHelper('getPendingRequests',function () {

  return fire.getPendingRequests();
});
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
    username : 'Audax' || 'User'


  });
});

app.listen(2009,function () {
  console.log("Runnning on port : 2009");
});

function randomize100() {
  return Math.floor(Math.random() * 10);
}

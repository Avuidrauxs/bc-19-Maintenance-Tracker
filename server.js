const express = require('express');
const hbs = require('hbs');
const fire = require('./lib/firebase');

var app = express();

//registering partials
hbs.registerPartials(__dirname + '/views/partials');

//registr helper to run functions
hbs.registerHelper('randomize100',function () {
  return randomize100();

});
hbs.registerHelper('getTotalMaintenance',function () {
  //return randomize100();
  return fire.getTotalMaintenance();
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

const express = require('express');
const hbs = require('hbs');

var app = express();

//registering partials
hbs.registerPartials(__dirname + '/views/partials');
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

    name: "Audax Main Dashboard"


  });
});

app.get('/login',function (req,res) {
  res.render('pages/login.hbs');
});


app.get('/blank',function (req,res) {
  res.render('pages/blank.hbs');
});

app.listen(2005,function () {
  console.log("Runnning on port : 2002");
});

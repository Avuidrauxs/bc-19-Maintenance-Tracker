const firebase = require('firebase');
const fs = require('fs');


const user = require('../models/users');
const maintenance = require('../models/maintenance');
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
var staffController = firebase.database().ref('staffList');
var maintenanceController = firebase.database().ref('work');
//userRef = ref.child("work");

var staff = new user.Users('Audax', 'Sool', 'Part', '2323ty', 'banku2323@skin.com', 'st23a', false, "0248236675", "dsif9iu heiuf");
var mainte = new maintenance.Maintenance(001, 'Car repair', '11/11/2016', 78, 'high', 'maintenance', false, "Pretty shitty work", null);


//Checking database
var connectedRef = firebase.database().ref(".info/connected");
var checkConnection = function() {

  connectedRef.on("value", function(snap) {
    if (snap.val() === true) {
      alert("connected");
    } else {
      alert("not connected");
    }
  });
}


var requestFixKeyExists = function() {
  var data = JSON.parse(fs.readFileSync('./assets/requests_raw.json'));

  for (staff in data) {
    data[staff].mainte.fKey = staff;

  }
  fs.writeFileSync("./assets/requests_raw.json", JSON.stringify(data));
  getTotalMaintenanceRepairs();
};

var duplicateRequests = function(str) {
  var data = JSON.parse(fs.readFileSync('./assets/requests_raw.json'));

  for (staff in data) {
    if(data[staff].mainte.id === str){
      return true;
    }else{
      return false;
    }

  }
  getTotalMaintenanceRepairs();
};
//requestFixKeyExists();

var userFixKeyExists = function() {
  var data = JSON.parse(fs.readFileSync('./assets/staff_raw.json'));

  for (staffs in data) {
    data[staffs].staff.uid = staffs;

  }
  fs.writeFileSync("./assets/staff_raw.json", JSON.stringify(data));

};

var duplicateStaff = function(usr) {
  var data = JSON.parse(fs.readFileSync('./assets/staff_raw.json'));

  for (staffs in data) {
    if(data[staffs].staff.username === usr)
    {
        return true;
    }else
      {
        return false;
      }


  }
  getAvailableStaff();

};

//console.log(checkIfKeyExists());
//userFixKeyExists();


//saves Staff memeber
var saveNewStaff = function(staff) {

  staffController.once("value", function(snapshot) {
    staffController.push({
      staff
    });

    getAvailableStaff();
    userFixKeyExists();

  }, function(error) {
    console.log("Error: " + error.code);
  });
}
//Saves Maintenance
var saveNewMaintenanceRequest = function(mainte) {

  maintenanceController.once("value", function(snapshot) {
    maintenanceController.push({
      mainte
    });

    getTotalMaintenanceRepairs();
    requestFixKeyExists();

  }, function(error) {
    console.log("Error: " + error.code);
  });
}


var getTotalMaintenanceRepairs = function() {

  maintenanceController.on("value", function(snapshot) {
    var allRequests = snapshot.val();
    fs.writeFileSync("./assets/requests_raw.json", JSON.stringify(allRequests));

  }, function(error) {
    console.log("Error: " + error.code);
  });

}



var getAvailableStaff = function() {

  staffController.on("value", function(snapshot) {
    var allStaff = snapshot.val();
    fs.writeFileSync("./assets/staff_raw.json", JSON.stringify(allStaff));

  }, function(error) {
    console.log("Error: " + error.code);
  });

}


var getAllCurrentRepairs = function() {
  var allRequests = 0;
  var data = JSON.parse(fs.readFileSync('./assets/requests_raw.json'));

  for (staffs in data) {
    if (data[staffs].mainte.active && data[staffs].mainte.type === "repair") {
      ++allRequests;
    }
  }

  getTotalMaintenanceRepairs();
  requestFixKeyExists();

  return allRequests;
}
var getAllRequestsOffline = function(mainte) {

  var allRequests = 0;
  var data = JSON.parse(fs.readFileSync('./assets/requests_raw.json'));

  for (staffs in data) {
    ++allRequests;
  }

  getTotalMaintenanceRepairs();
  requestFixKeyExists();

  return allRequests;
}

var getAllStaffOffline = function() {
  var data = JSON.parse(fs.readFileSync('./assets/staff_raw.json'));
  var allStaff = 0;
  for (staffs in data) {
    if (data[staffs].staff.presence === true) {
      ++allStaff;
    }
  }

  getAvailableStaff();
  userFixKeyExists();
  return allStaff;

}
var getAllCurrentMaintenance = function() {
  var allRequests = 0;
  var data = JSON.parse(fs.readFileSync('./assets/requests_raw.json'));

  for (staffs in data) {
    if (data[staffs].mainte.active && data[staffs].mainte.type === "maintenance") {
      ++allRequests;
    }
  }

  getTotalMaintenanceRepairs();
  requestFixKeyExists();

  return allRequests;

}
var deleteStaff = function(astaff) {

  var p = staffController.child(astaff).remove();
  if (p) {
    getAvailableStaff();
    userFixKeyExists();
    return true
  } else {
    return false
  }
}

var updateStaff = function(astaff) {
  astaff = new user.Users();
  var p = staffController.child(astaff.uid + '/staff').update(astaff);
  if (p) {
    getAvailableStaff();
    userFixKeyExists();
    return true
  } else {
    return false
  }
}
var deleteManRep = function (mant){

    var p = maintenanceController.child(mant).remove();
    if (p !== null) {
      getTotalMaintenanceRepairs();
      requestFixKeyExists();
      return true
    } else {
      return false
    }

}

var updateManRep = function (mant){
  mant = new maintenance.Maintenance();
  var p = maintenanceController.child(mant.fKey +'/mainte').update(mant);
  if (p) {
    getTotalMaintenanceRepairs();
    requestFixKeyExists();
    return true
  } else {
    return false
  }
}
getAvailableStaff();
getTotalMaintenanceRepairs();
//console.log(getAllCurrentMaintenance())
module.exports = {
  getAllRequestsOffline,
  saveNewStaff,
  saveNewMaintenanceRequest,
  getAllStaffOffline,
  getAllCurrentMaintenance,
  getAllCurrentRepairs,
  duplicateStaff,
  duplicateRequests,
  deleteStaff,
  updateStaff,
  updateManRep,
  deleteManRep,getAvailableStaff,getTotalMaintenanceRepairs
}

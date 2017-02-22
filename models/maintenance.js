const fire = require('./lib/firebase');
const fs = require('fs');

const maintenanceController = fire.maintenanceController;



function Maintenance(id, title, datetime, repairer_name, priorty, type, active, comments, imgURL) {

  this.id = id;
  this.title = title;
  this.datetime = datetime;
  this.repairer_name = repairer_name;
  this.priorty = priorty;
  this.type = type;
  this.active = active;
  this.comments = comments;
  this.imgURL = imgURL;

}

Maintenance.prototype.getAllRequests = function(mainte) {

  var allRequests = [];
  var notestring = fs.readFileSync('./assets/requests_raw.json');
  var tempArray = JSON.parse(notestring);
  var tempKeys = Object.keys(tempArray);
  var tempList = [];

  for (var i = 0; i < tempKeys.length; i++) {
    var k = tempKeys[i];

    tempList.push(tempArray[k].mainte);
    allRequests = tempList.filter(function() {
      return tempArray[k].mainte.title !== null;
    });
  }
  fs.writeFileSync("./assets/requests.json", JSON.stringify(allRequests));
  fire.getTotalMaintenanceRepairs();

}

Maintenance.prototype.createRequest = function(mainte,callback) {

  maintenanceController.once("value", function(snapshot) {
    maintenanceController.push({
      mainte
    });


  }, function(error) {
    callback("Error: " + error.code);
  });
}

Maintenance.prototype.removeRequest = function(title, callback) {
  // body...
};

Maintenance.prototype.editRequest = function(title, callback) {
  // body...
};
module.exports = {
  Maintenance
}

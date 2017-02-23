const fire = require('../lib/firebase');
const fs = require('fs');

const maintenanceController = fire.maintenanceController;



function Maintenance(id, title, datetime, repairer_name, priorty, type, active, comments, imgURL,fKey) {

  this.id = id;
  this.title = title;
  this.datetime = datetime;
  this.repairer_name = repairer_name;
  this.priorty = priorty;
  this.type = type;
  this.active = active;
  this.comments = comments;
  this.imgURL = imgURL;
  this.fKey = fKey;

}

Maintenance.prototype.getAllRequests = function(mainte) {



}

Maintenance.prototype.createRequest = function(mainte,callback) {


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

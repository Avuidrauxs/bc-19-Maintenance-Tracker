const fire = require('../lib/firebase');
const fs = require('fs');

const maintenanceController = fire.maintenanceController;



function Maintenance(id, title, repairer_name, priorty, type, comments, imgURL,fKey,done,active,datetime) {

  this.id = id;
  this.title = title;

  this.repairer_name = repairer_name;
  this.priorty = priorty;
  this.type = type;

  this.comments = comments;
  this.imgURL = imgURL;
  this.fKey = fKey;
  this.active = active;
  this.done = done;
  this.datetime = datetime;

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

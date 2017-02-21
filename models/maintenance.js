function Maintenance(id,title,datetime,repairer_assigned,priorty,type,active){

    this.id = id;
    this.title = title;
    this.datetime = datetime;
    this.repairer_assigned = repairer_assigned;
    this.priorty = priorty;
    this.type = type;
    this.active = active;

}

Maintenance.prototype.getAllRequests = function (type,callback) {

};

Maintenance.prototype.createRequest = function (mainRequest,user) {
  // body...
};

Maintenance.prototype.removeRequest = function (title,callback) {
  // body...
};

Maintenance.prototype.editRequest = function (title,callback) {
  // body...
};

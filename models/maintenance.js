function Maintenance(id,title,datetime,repairer_id,priorty,type,active,comments){

    this.id = id;
    this.title = title;
    this.datetime = datetime;
    this.repairer_id = repairer_id;
    this.priorty = priorty;
    this.type = type;
    this.active = active;
    this.comments = comments;

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
module.exports = {
  Maintenance
}

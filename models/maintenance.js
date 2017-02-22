function Maintenance(id,title,datetime,repairer_name,priorty,type,active,comments,imgURL){

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


exports.authenticate = function(req) {
    
    var user =  req.session.user,
    userId = req.session.userId;
    
    if(userId == null){
       return false;
    }

    return true;
}
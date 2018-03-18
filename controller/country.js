exports.getStateByCountry = function (req, res) {
    var message = '';
    var id = req.params.countryId;
    var sql = "SELECT * FROM `states` WHERE `country_id`='" + id + "'";
    db.query(sql, function (err, result) {
        if (result.length <= 0)
            message = "states not found!";
      
        res.send({ data: result, message: message });
    });
};


exports.getCitiesByState = function (req, res) {
    var message = '';
    var id = req.params.stateId;
    var sql = "SELECT * FROM `cities` WHERE `state_id`='" + id + "'";
    db.query(sql, function (err, result) {
        if (result.length <= 0)
            message = "cities not found!";
      
        res.send({ data: result, message: message });
    });
};
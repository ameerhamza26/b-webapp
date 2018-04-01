var FCM = require('fcm-node');
var config = require('../config');

var mysql = require('promise-mysql');
var config = require('../config');


var fcm = new FCM(config.fcmcloud.serverKey);

exports.sendPushNotification = function(req,res) {
    var post =req.body;

    var final_obj = {};
    var connection;
    
    var sql = "select * from `devicetokens`";
    var tokens =[];
    mysql.createConnection(config.dbConfig).then(function(conn){
        connection = conn;
      
        var result = connection.query(sql);


        return result;
    }).then(function(result) {
        if (result.length >0) {
            for (var i =0; i<result.length;i++) {
                tokens.push(result[i].tokens);
            }
        }
        final_obj.tokens = tokens;
        var sql ="Select * from `causes` where id = " + post.causeId;
        var result = connection.query(sql);
        return result;
    }).then(function(cause) {
        final_obj.data = cause[0];
        var sql = " insert into `notifications` (Title, CauseId) Values ('" +post.title+"', " +post.causeId + ")";
        var result = connection.query(sql);
        return result;
    }).then(function() {

        

        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            registration_ids: final_obj.tokens, 
            collapse_key: 'your_collapse_key',
            
            notification: {
                title: post.title, 
                body: post.message 
            },
            
            data: final_obj.data
        };
        console.log("message", message);
        
        fcm.send(message, function(err, response){
            if (err) {
                console.log("Something has gone wrong!", err);
            } else {
                console.log("Successfully sent with response: ", response);
            }
            connection.end();
            res.send({message:'Notification sent', status: 'success'})
        });

    })

   
    // db.query(sql, function (err, result) {
    //     if (result.length >0) {
    //         for (var i =0; i<result.length;i++) {
    //             tokens.push(result[i].tokens);
    //         }
    //     }
        
    //     console.log("Result",tokens);

    //     var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    //         registration_ids: tokens, 
    //         collapse_key: 'your_collapse_key',
            
    //         notification: {
    //             title: post.title, 
    //             body: post.message 
    //         },
            
    //         data: {  //you can send only notification or only data(or include both)
    //             my_key: 'my value',
    //             my_another_key: 'my another value'
    //         }
    //     };
        
    //     fcm.send(message, function(err, response){
    //         if (err) {
    //             console.log("Something has gone wrong!", err);
    //         } else {
    //             console.log("Successfully sent with response: ", response);
    //         }
    //         res.send({message:'Notification sent'})
    //     });
    // });


}

exports.addDeviceToken = function(req,res) {

    var post = req.body;
    var token = post.token;
    console.log("token",token);
    var sql = "insert into `devicetokens` (`tokens`) Values ('" + token +"')";

    db.query(sql, function (err, result) {
        console.log("Err", err);
        if (err) {
            return ;
        }
        else {


            return res.send({ message: 'Device token successfully inserted'});
        }
    });

   //return res.send({ message: 'Already inserted'});
}

exports.get = function(req,res) {
    message = '';
    var sql = "SELECT `ID`, `Title` FROM `causes`";
    db.query(sql, function (err, result) {
        if (result.length <= 0)
            message = "Causes not found!";

        res.render('sendnotification.ejs', { data: result, message: message });
    });
}
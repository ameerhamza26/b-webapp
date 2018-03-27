var FCM = require('fcm-node');
var config = require('../config');

var fcm = new FCM(config.fcmcloud.serverKey);

exports.sendPushNotification = function(req,res) {
    var post =req.body;
    var tokens =[];
    var sql = "select * from `devicetokens`";
    db.query(sql, function (err, result) {
        if (result.length >0) {
            for (var i =0; i<result.length;i++) {
                tokens.push(result[i].tokens);
            }
        }
        
        console.log("Result",tokens);

        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            registration_ids: tokens, 
            collapse_key: 'your_collapse_key',
            
            notification: {
                title: post.title, 
                body: post.message 
            },
            
            data: {  //you can send only notification or only data(or include both)
                my_key: 'my value',
                my_another_key: 'my another value'
            }
        };
        
        fcm.send(message, function(err, response){
            if (err) {
                console.log("Something has gone wrong!", err);
            } else {
                console.log("Successfully sent with response: ", response);
            }
            res.send({message:'Notification sent'})
        });
    });


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
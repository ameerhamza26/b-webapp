var authentication =require('../helpers/authentication');
var mysql = require('promise-mysql');
var config = require('../config');
var Promise = require('bluebird');
var alasql = require('alasql');


exports.get =function(req,res) {

    if (!authentication.authenticate(req)){
        res.redirect("/login");
        return;
    }

    var sql = "";
    
    if (req.query.title) {
        title= req.query.title;
        sql = "Select * from survey";
    }
    else {
        sql = "Select * from survey";
    }
    
    db.query(sql, function(err, result){
        if (result) {
            if(result.length >= 0){
                res.render('survey.ejs',{data: result});
            } else{
                res.render('survey.ejs',{data:[]})
            }
        } else{
            res.render('survey.ejs',{data:[]})
        }
    });
};

exports.getUserResponse =function(req,res) {

    if (!authentication.authenticate(req)){
        res.redirect("/login");
        return;
    }

    var sql = "";
    
    if (req.query.title) {
        title= req.query.title;
        sql = "Select * from survey";
    }
    else {
        sql = "Select * from survey";
    }
    
    db.query(sql, function(err, result){
        if (result) {
            if(result.length >= 0){
                res.render('userresponse.ejs',{data: result});
            } else{
                res.render('userresponse.ejs',{data:[]})
            }
        } else{
            res.render('userresponse.ejs',{data:[]})
        }
    });
};

exports.createQuestions = function(req,res) {
    // var post = req.body;

    // var questionType = post.questionType;
    // var surveyId = req.params.id;
    //     var question = post.question;
    //     var option1 = post.option1;
    //     var option2 = post.option2;
    //     var option3 = post.option3;
    //     var option4 = post.option4;
    //     var sql = "Insert into `surveyquestions` (`SurveyId`, `Question`, `AnswerType`, `Option1`, `Option2`, `Option3`, `Option4`) values ( \
    //     "+ surveyId +", '"+ question+"', '"+ questionType+  "', '" +option1  +"', '"+ option2+"', '"+ option3+"', '"+option4+"' )";
    
    //     var query = db.query(sql, function (err, result) {
    //         res.send({data :result});
    //     });   
        
        var post = req.body.data;
        var values = req.body.data;
        
        console.log("Values",post);
        var sql = "INSERT INTO `surveyquestions` (`SurveyId`,`Question`, `AnswerType`,`Option1`, `Option2`, `Option3`, `Option4`) VALUES ?";
        
        var query = db.query(sql, [values], function (err, result) {
            console.log("Err",err);

            res.cookie('message', 'Survey is successfully created')
            res.cookie('icon', 'success')
            res.cookie('heading', 'Success')
            res.send({});
        });
}

exports.create = function (req, res) {
    message = '';
    if (req.method == "POST") {
        
        var post = req.body;
        var cause_id = post.causeId;
        var title = post.title;
        
        title = title.replace(/'/g, '\\\'');
        
        var sql = "INSERT INTO `survey`(`CauseId`,`Title`) VALUES ('" + cause_id + "','" + title + "')";

        var query = db.query(sql, function (err, result) {

            res.cookie('message', 'Survey is successfully created')
            res.cookie('icon', 'success')
            res.cookie('heading', 'Success')
            res.send({surveyId :result.insertId});
        });
    } else {
        var sql = "SELECT `ID`, `Title` FROM `causes`";
        db.query(sql, function (err, result) {
            if (result.length <= 0)
                message = "Causes not found!";
    
            res.render('createsurvey.ejs', { data: result, message: message });
        });
    }
};


exports.search = function(req,res) {
    var message = '';
    var text = req.query.text;
    
    var sql = "select survey.* from survey \
     inner JOIN causes \
    on causes.ID = survey.CauseId \
    where causes.Title like '%" + text + "%' \
    or survey.Title like '%"+ text+"%' ";
    
    db.query(sql, function(err, result){
        if (err) {
            res.send({data:[]})
        }
        
        if(result.length >= 0){
            res.send({data: result});
        }else{
            res.send({data:[]})
        }
   });
}

exports.editQuestion = function(req,res) {

    if (req.body.data.length > 0) {
        var post =req.body.data;
        var sqlArray = ["Delete from `surveyquestions` where SurveyId = "+ req.params.surveyId + " "];
        for (var i =0; i<post.length;i++) {
            var sql = "INSERT INTO `surveyquestions` (`SurveyId`,`Question`, `AnswerType`,`Option1`, `Option2`, `Option3`, `Option4`) VALUES ( " + post[i][0] + " , '" +  post[i][1] +"' , '" +  post[i][2] + "', '" +  post[i][3] +"' , '" +  post[i][4] +"' , '" + post[i][5] + "' , '" +  post[i][6] + "' ) ";
            sqlArray.push(sql);
        }
        var p;
        for (let i = 0, p = Promise.resolve(); i <= sqlArray.length; i++) {
            if (i== sqlArray.length) {
                p.then(()=> {
            
                    res.send({status: 'success'});
                })
            } else {
                p = p.then(_ => new Promise((resolve) => {
                    db.query(sqlArray[i],function(err,result) {
                        resolve();
                    })
                }));
            }

        }
    } else {
        res.send({status: 'success'});
    }
}


exports.edit = function(req, res){
	var message = '';
    var id = req.params.id;
    var connection;
    if (req.method == 'POST') {
        var post = req.body;
        var cause_id = post.causeId;
        var title = post.title;
        
        title = title.replace(/'/g, '\\\'');
        sql = " update `survey` set CauseId = " + cause_id + " , \
        Title = '" + title + "' where id = " + id;
        var query = db.query(sql, function (err, result) {
            console.log("err",err);

            res.send({status :'success'});
        });
    }
    else {
        var sql = "SELECT * FROM `survey` WHERE `id`='" + id + "'";
        
        var final_obj = {};

        var survey ;
        mysql.createConnection(config.dbConfig).then(function(conn){
            connection = conn;
            var result = connection.query(sql);
       
            return result;
        }).then(function(rows){
            final_obj.data = rows;
            
            sql = "SELECT `ID`, `Title` FROM `causes`";
            result = connection.query(sql);
            return result;
        }).then(function(rows){
            final_obj.causes = rows;
            if (!final_obj.data[0]) {
                return;
            }
            sql = "SELECT * FROM `surveyquestions` where SurveyId = " + final_obj.data[0].ID ;
            result = connection.query(sql);
            // Logs out a list of hobbits
            connection.end();
            return result;
        }).then(function(rows) {
            final_obj.questions = rows;
            final_obj.message = message;
            res.render('editsurvey.ejs', final_obj);
        })

    }
};


exports.getByCause = function(req,res) {
    var message = '';
    var id = req.params.causeId;
    var sql = "SELECT * FROM `survey` WHERE `CauseId`='" + id + "'";
    db.query(sql, function (err, result) {
        if (result.length <= 0)
            message = "Cause not found!";
      
        res.send({ data: result, message: message });
    });
}

exports.getQuestionBySurvey = function(req,res) {
    var message = '';
    var id = req.params.surveyId;
    var sql = "SELECT * FROM `surveyquestions` WHERE `SurveyId`='" + id + "'";
    db.query(sql, function (err, result) {
        if (result.length <= 0)
            message = "Cause not found!";
      
        res.send({ data: result, message: message });
    });
}

exports.saveUserResponse = function(req,res) {
    var post = req.body;
    var values = post;
    
    var sql = "INSERT INTO `userresponsesurvey`(`SurveyId`,`Question`, `Answer`) VALUES ?";
    
    var query = db.query(sql, [values], function (err, result) {
        res.send({status :'success'});
    });
}

exports.download = function(req,res) {
    
    var id = req.params.surveyId;
    var sql = "select sq.question, sq.answertype, sq.option1, sq.option2, sq.option3, sq.option4, ur.answer as userresponse  \
    from survey \
    inner join surveyquestions sq \
    on survey.ID = sq.SurveyId \
    inner join userresponsesurvey ur \
    on ur.Question = sq.ID \
    where ur.surveyid = " + id;
    
    db.query(sql, function(err, result){
        if (err) {
            res.send({data:[]})
        }
        
        if(result.length >= 0){
            res.send({data: result});
        }else{
            res.send({data:[]})
        }
   });
}
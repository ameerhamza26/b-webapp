var authentication =require('../helpers/authentication');

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

exports.createQuestions = function(req,res) {
    var post = req.body;

    var questionType = post.questionType;
    var surveyId = req.params.id;
        var question = post.question;
        var option1 = post.option1;
        var option2 = post.option2;
        var option3 = post.option3;
        var option4 = post.option4;
        var sql = "Insert into `surveyquestions` (`SurveyId`, `Question`, `AnswerType`, `Option1`, `Option2`, `Option3`, `Option4`) values ( \
        "+ surveyId +", '"+ question+"', '"+ questionType+  "', '" +option1  +"', '"+ option2+"', '"+ option3+"', '"+option4+"' )";
    
        var query = db.query(sql, function (err, result) {
            res.send({data :result});
        });     
}

exports.create = function (req, res) {
    message = '';
    if (req.method == "POST") {
        
        var post = req.body;
        var cause_id = post.causeId;
        var title = post.title;
        
        var sql = "INSERT INTO `survey`(`CauseId`,`Title`) VALUES ('" + cause_id + "','" + title + "')";

        var query = db.query(sql, function (err, result) {
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



exports.edit = function(req, res){
	var message = '';
	var id = req.params.id;
    var sql="select survey.CauseId, survey.Title, surveyquestions.* \
    from survey \
    LEFT JOIN \
    surveyquestions \
    on survey.ID = surveyquestions.SurveyId \
    where survey.ID = " + id; 
    db.query(sql, function(err, result){
	  if(result.length <= 0)
	  message = "surveyquestions not found!";
	  
      res.render('editsurvey.ejs',{data:result, message: message});
   });
};
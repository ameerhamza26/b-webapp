var authentication =require('../helpers/authentication');
/*
* GET home page.
*/
 
exports.index = function(req, res){

    var message = '';
    res.render('login',{message: message});
 
};

exports.home = function(req, res){
    
    if (!authentication.authenticate(req)){
        res.redirect("/login");
        return;
    }

    var sql = "Select * From Causes";
    db.query(sql, function(err, result){
        if(result.length >= 0){
            res.render('index',{data: result});
        }else{
            res.render('index',{data:[]})
        }

    });

    // var message = '';
    // res.render('index',{message: message});
 
};

exports.signup = function(req, res){
    message = '';
    if(req.method == "POST"){
       var post  = req.body;
       var name= post.user_name;
       var pass= post.password;
       var fname= post.first_name;
       var lname= post.last_name;
       var mob= post.mob_no;
  
       var sql = "INSERT INTO `users`(`first_name`,`last_name`,`mob_no`,`user_name`, `password`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "')";
  
       var query = db.query(sql, function(err, result) {
  
          message = "Succesfully! Your account has been created.";
          res.render('signup.ejs',{message: message});
       });
  
    } else {
       res.render('signup');
    }
 };


 exports.login = function(req, res){
    var message = '';
    var sess = req.session; 
  
    if(req.method == "POST"){
       var post  = req.body;
       var name= post.user_name;
       var pass= post.password;
      
       var sql="SELECT id, first_name, last_name, user_name FROM `users` WHERE `user_name`='"+name+"' and password = '"+pass+"'";                           
       db.query(sql, function(err, results){      
          if(results.length){
             req.session.userId = results[0].id;
             req.session.user = results[0];
             console.log(results[0].id);
             res.redirect('/home');
          }
          else{
             message = 'Wrong Credentials.';
             res.render('login.ejs',{message: message});
          }
                  
       });
    } else {
       res.render('login.ejs',{message: message});
    }         
 };

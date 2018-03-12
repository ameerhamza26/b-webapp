
exports.create = function(req,res) {
    message = '';
    if(req.method == "POST"){
       var post  = req.body;
       var title= post.title;
       var description= post.description;
 
       if (!req.files)
                 return res.status(400).send('No files were uploaded.');
 
         var file = req.files.uploaded_image;
         var img_name=file.name;
 
            if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                                  
               file.mv('public/images/upload_images/'+file.name, function(err) {
                              
                   if (err)
 
                     return res.status(500).send(err);
                           var sql = "INSERT INTO `Causes`(`Title`,`Description`,`Image`) VALUES ('" + title + "','" + description + "','" + img_name + "')";
 
                             var query = db.query(sql, function(err, result) {
                                  res.redirect('/causes/edit/'+result.insertId);
                             });
                        });
           } else {
             message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
             res.render('causes.ejs',{message: message});
           }
    } else {
       res.render('causes');
    } 
}



exports.edit = function(req, res){
	var message = '';
	var id = req.params.id;
    var sql="SELECT * FROM `Causes` WHERE `id`='"+id+"'"; 
    db.query(sql, function(err, result){
	  if(result.length <= 0)
	  message = "Cause not found!";
	  
      res.render('causeedit.ejs',{data:result, message: message});
   });
};
var index = require('./controller/index');
// development only

module.exports = function(app){
    app.get('/', index.index);//call for main index page
    app.post('/', index.index);//call for signup post 
    
        
    app.get('/profile/:id',index.profile);
}

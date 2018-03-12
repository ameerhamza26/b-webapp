var index = require('./controller/index');
var causes = require('./controller/causes');
// development only

module.exports = function(app){
    app.get('/', index.index);//call for main index page
    app.get('/causes/edit/:id', causes.edit);
    app.post('/create/cause', causes.create);
    app.get('/create/cause', causes.create);
}

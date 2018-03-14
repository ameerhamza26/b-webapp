var index = require('./controller/index');
var causes = require('./controller/causes');
var events = require('./controller/events');
var resources = require('./controller/resources');
var talkingPoints = require('./controller/talkingpoints');
// development only

module.exports = function (app) {
    app.get('/', index.index);//call for main index page
    app.get('/causes/edit/:id', causes.edit);
    app.post('/create/cause', causes.create);
    app.get('/create/cause', causes.create);
    app.get('/create/event', events.create);

    app.get('/create/talkingpoints', talkingPoints.create);
    app.post('/create/talkingpoints', talkingPoints.create);

    app.get('/talkingpoints/edit/:id', talkingPoints.edit);
    app.post('/create/event', events.create);

    app.get('/events/edit/:id', events.edit);



    app.get('/create/resource', resources.create);
    app.post('/create/resource', resources.create);
    app.get('/resources/edit/:id', resources.edit);

    /*Mobile Web  */
    app.get('/api/causes/list', causes.list);
    app.get('/api/causes/all' , causes.getAll);


}

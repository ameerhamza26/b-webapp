var index = require('./controller/index');
var causes = require('./controller/causes');
var events = require('./controller/events');
var resources = require('./controller/resources');
var talkingPoints = require('./controller/talkingpoints');
var localmedia = require('./controller/media');
var country = require('./controller/country');
var survey = require('./controller/survey');
var notification = require('./controller/notification');
// development only

module.exports = function (app) {



    app.get('/', index.index);//call for main index page
    app.get('/login', index.index);
    app.get('/signup', index.signup);
    app.post('/signup', index.signup);

    app.get('/home', index.home );

    app.post('/login', index.login)

    app.get('/causes/edit/:id', causes.edit);
    app.post('/causes/edit/:id', causes.edit);

    app.post('/create/cause', causes.create);
    app.get('/create/cause', causes.create);
    app.get('/cause/search', causes.search);

    app.get('/events', events.get);
    app.get('/create/event', events.create);

    app.get('/talkingpoints', talkingPoints.list);
    app.get('/create/talkingpoints', talkingPoints.create);
    app.post('/create/talkingpoints', talkingPoints.create);
    app.get('/talkingpoints/edit/:id', talkingPoints.edit);
    
    app.post('/create/event', events.create);

    app.get('/events/edit/:id', events.edit);

    app.get('/localmedia',localmedia.get);

    app.get('/create/localmedia', localmedia.create );
    app.post('/create/localmedia', localmedia.create );
    app.get('/localmedia/edit/:id', localmedia.edit);


    app.get('/create/resource', resources.create);
    app.post('/create/resource', resources.create);
    app.get('/resources/edit/:id', resources.edit);


    app.get('/survey', survey.get);
    app.get('/create/survey', survey.create );
    app.post('/create/survey', survey.create );

    app.post('/create/survey/:id/questions', survey.createQuestions);

    app.get('/survey/edit/:id', survey.edit );

    app.get('/api/survey/search', survey.search);

    /*Mobile Web  */
    app.get('/api/causes/list', causes.list);
    app.get('/api/causes/all' , causes.getAll);
    app.get('/api/states/:countryId', country.getStateByCountry);
    
    app.get('/api/cities/:stateId', country.getCitiesByState);

    app.get('/api/localmedia/search', localmedia.search);
    app.get('/api/events/:causeId', events.getByCause);
    app.get('/api/survey/:causeId', survey.getByCause);
    app.get('/api/questions/:surveyId', survey.getQuestionBySurvey);
    app.post('/api/save/userresponse', survey.saveUserResponse);
    app.get('/api/talkingpoints/:causeId', talkingPoints.getByCause);
    app.get('/api/resources/:causeId', resources.getByCause);
    app.get('/api/resourceurls/:resourceId', resources.getResourceUrls);
    app.get('/api/donationurls/:causeId', causes.getDonationUrlsByCause);
    app.post('/api/devicetoken',  notification.addDeviceToken);
    app.post('/api/send/notification', notification.sendPushNotification);

}

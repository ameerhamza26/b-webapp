var index = require('./controller/index');
var causes = require('./controller/causes');
var events = require('./controller/events');
var resources = require('./controller/resources');
var talkingPoints = require('./controller/talkingpoints');
var localmedia = require('./controller/media');
var country = require('./controller/country');
var survey = require('./controller/survey');
var notification = require('./controller/notification');
var donation = require('./controller/donation');
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
    app.get('/cause/search/:causeId', causes.search);

    app.get('/events/:causeId', events.get);
    app.get('/create/event/:causeId', events.create);
    app.post('/create/event/:causeId', events.create);
    app.get('/events/edit/:id/:causeId', events.edit);
    app.post('/events/edit/:id/:causeId', events.edit);

    app.get('/talkingpoints/:causeId', talkingPoints.list);
    app.get('/create/talkingpoints/:causeId', talkingPoints.create);
    app.post('/create/talkingpoints/:causeId', talkingPoints.create);
    app.get('/talkingpoints/edit/:id/:causeId', talkingPoints.edit);
    app.post('/talkingpoints/edit/:id/:causeId', talkingPoints.edit);
    
    



    app.get('/localmedia/:causeId',localmedia.get);

    app.get('/create/localmedia/:causeId', localmedia.create );
    app.post('/create/localmedia/:causeId', localmedia.create );
    app.get('/localmedia/edit/:id/:causeId', localmedia.edit);
    
    app.post('/localmedia/edit/:id/:causeId', localmedia.edit);

    app.get('/resources/:causeId' , resources.list)
    app.get('/create/resources/:causeId', resources.create);
    app.post('/create/resources/:causeId', resources.create);
    app.get('/resources/edit/:id/:causeId', resources.edit);
    app.post('/resources/edit/:id/:causeId', resources.edit);


    app.get('/survey/:causeId', survey.get);
    app.get('/create/survey/:causeId', survey.create );
    app.post('/create/survey/:causeId', survey.create );

    app.post('/create/survey/:id/questions', survey.createQuestions);

    app.get('/survey/edit/:id/:causeId', survey.edit );
    app.post('/survey/edit/:id/:causeId', survey.edit );
    app.post('/survey/edit/questions/:surveyId', survey.editQuestion );

    app.get('/api/survey/search/:causeId', survey.search);




    app.get('/sendnotification/:causeId', notification.get);

    app.get('/api/cause/search/talkinpoint/:causeId', talkingPoints.search);
    app.get('/api/cause/search/resources/:causeId', resources.search);
    /*Mobile Web  */
    app.get('/api/causes/list', causes.list);
    app.get('/api/causes/all' , causes.getAll);
    app.get('/api/states/:countryId', country.getStateByCountry);
    
    app.get('/api/cities/:stateId', country.getCitiesByState);
    app.get('/donationurls/:causeId', donation.get);
    app.get('/create/donationurls/:causeId', donation.create);
    app.post('/create/donationurls/:causeId', donation.create);

    app.get('/api/localmedia/search/:causeId', localmedia.search);
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

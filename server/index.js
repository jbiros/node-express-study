const express = require('express');
const createError = require('http-errors');
const path = require('path');
const configs = require('./config');
const SpeakerService = require('./services/SpeakerService');
const app = express();

const config = configs[app.get('env')];

const speakerService = new SpeakerService(config.data.speakers);

app.set('view engine', 'pug');

// prettify html on development only
// use this condition to create some function that only runs on dev.
if(app.get('env') === 'development'){
    app.locals.pretty = true;
}
app.set('views', path.join(__dirname, './views'));
// asigns title to every pages
app.locals.title = config.sitename;

// just sample to display render time
app.set((req, res, next) => {
    res.locals.rendertime = new Date();
    return next();  //important for any middleware to continue
});
// can remove if not used

const routes = require('./routes');


// serve static files
app.use(express.static('public'));

// return nothing if favicon is not available
app.get('/favicon.ico', (req, res, next) => {
    return res.sendStatus(204);
});

app.use(async (req, res, next) => {
    try{
        const names = await speakerService.getNames();
        console.log(names);
        res.locals.speakerNames = names;
        return next();
    } catch(err) {
        return next(err);
    }
});

app.use('/', routes({
    speakerService
}));

app.use((req, res, next) => {
    return next(createError(404, 'Content Not Found'));
});

// Create error message and status response on error pages
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    const status = err.status || 500;
    res.locals.status = status;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(status);
    res.render('error');
});

// Live Reload setup

app.listen(3000);

module.export = app;
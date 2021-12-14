const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const createError = require('http-errors');

const bodyParser = require('body-parser');

const FeedbackService = require('./services/FeedbackService');
const SpeakersService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakersService = new SpeakersService('./data/speakers.json');

const routes = require('./routes');
const { request } = require('http');

const app = express();

const port = 3000;

app.set('trust proxy', 1);

app.use(cookieSession({
    name: 'session',
    keys: ['Ainunwepd', 'wedwewefw'],
}));

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.locals.siteName = 'ROUX Meetups';

app.use(express.static(path.join(__dirname, './static')));

app.use(async (request, response, next) => {
    try {
        const names = await speakersService.getNames()
        response.locals.speakersNames = names;
        return next();
    } catch (err) {
        return next(err);
    }
})

app.use('/', routes({
    feedbackService,
    speakersService,
}));

app.use((request, response, next) => {
    return next(createError(404, 'File not found'));
});

app.use((err, request, response, next) => {
    response.locals.message = err.message;
    const status = err.status || 500;
    response.locals.status = status;
    response.status(status);
    response.render('error');
})

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});

const express = require('express');

const spaekersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

const router = express.Router();

module.exports = params => {

    router.get('/', async (request, response) => {
        response.render('layout', { pageTitle: 'Welcome', template:'index' });
    });

    router.use('/speakers', spaekersRoute(params));
    router.use('/feedback', feedbackRoute(params));

    return router;
}

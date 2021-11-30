const express = require('express');

const spaekersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

const router = express.Router();

module.exports = () => {
    router.get('/', (request, response) => {
        response.render('pages/index', { pageTitle: 'Welcome' });
    });

    router.use('/speakers', spaekersRoute());
    router.use('/feedback', feedbackRoute());
    
    return router;
}

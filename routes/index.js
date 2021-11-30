const express = require('express');

const spaekersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

const router = express.Router();

module.exports = params => {

    router.get('/', async (request, response) => {

        if (!request.session.visitcount) {
            request.session.visitcount = 0;
        }
        request.session.visitcount += 1;
        console.log(`Number of visits: ${request.session.visitcount}`);

        response.render('pages/index', { pageTitle: 'Welcome' });
    });

    router.use('/speakers', spaekersRoute(params));
    router.use('/feedback', feedbackRoute(params));

    return router;
}

const express = require('express');

const spaekersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

const router = express.Router();

module.exports = params => {
    const { speakersService } = params;

    router.get('/', async (request, response, next) => {
        try {
            return next(new Error('Some error'));
            const artwork = await speakersService.getAllArtwork();
            const topSpeakers = await speakersService.getList();
            return response.render('layout', { pageTitle: 'Welcome', template: 'index', topSpeakers, artwork });
        } catch (error) {
            return next(error);
        }

    });

    router.use('/speakers', spaekersRoute(params));
    router.use('/feedback', feedbackRoute(params));

    return router;
}

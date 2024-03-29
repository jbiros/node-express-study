const express = require('express');

const router = express.Router();

const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

module.exports = (param) => {
   
    const { speakerService } = param;

    router.get('/', async (req, res, next) => {
        try {
            const promises = [];
            // when use await, use async
            promises.push(speakerService.getListShort());
            promises.push(speakerService.getAllArtwork());
    
            const results = await Promise.all(promises);    
    
            return res.render('index', {
                page: 'Homepage',
                speakerList: results[0],
                artwork: results[1],
            });
        } catch(err) {
           return next(err);
        }
    });

    router.use('/speakers', speakersRoute(param));
    router.use('/feedback', feedbackRoute(param));
    
    return router;
};
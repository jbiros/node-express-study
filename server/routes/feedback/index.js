const express = require('express');

const router = express.Router();

module.exports = () => {
    router.get('/', (req, res, next) => {
        return res.render('Feedback', {
            page: 'Feedback',
        });
    });


    router.get('/:name', (req, res, next) => {
        return res.send('Form Sent');
    });

    return router;
};
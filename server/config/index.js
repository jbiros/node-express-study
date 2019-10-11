const path = require('path');


module.exports = {
    development: {
        sitename: 'Node/Express Website Boiler Template [Development]',
        data: {
            speakers: path.join(__dirname, '../data/speakers.json'),
            feedback: path.join(__dirname, '../data/feedback.json'),
        }
    },
    production: {
        sitename: 'Node/Express Website Boiler',
        data: {
            speakers: path.join(__dirname, '../data/speakers.json'),
            feedback: path.join(__dirname, '../data/feedback.json'),
        }
    },
}
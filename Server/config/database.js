const Sequelize = require('sequelize')

const db = new Sequelize('postgres://admin:RFMFJTYTDJBBJTTN@aws-us-east-1-portal.9.dblayer.com:15350/cozy')

db.authenticate()
    .then(function(err) {
        console.log('Successful Connection to the database');
    })
    .catch(function(err) {
        console.log('+++line 10 config.database.js: cannot connect to the database ', err);
    });

module.exports = db;

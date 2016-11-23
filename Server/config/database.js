const Sequelize = require('sequelize')

const db = new Sequelize('postgres://jbtfiwchnvetss:NT4vocOZ3xizxMUn_0qE_Tr7yE@ec2-54-235-255-27.compute-1.amazonaws.com:5432/d7elsc8qf9fl0n')

db.authenticate()
    .then(function(err) {
        console.log('Successful Connection to the database');
    })
    .catch(function(err) {
        console.log('+++line 10 config.database.js: cannot connect to the database ', err);
    });

module.exports = db;

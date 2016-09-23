const Sequelize = require('sequelize')
const sequelize = require('../config/database')
let Houses = require('../houses/model.houses.js')
let chalk = require('chalk')

// These are the tables for all Poll related data: Poll, 
// pollOptions, votes

const Polls = sequelize.define('polls', {
  question: {
    type: Sequelize.STRING(120),
    notNull: true
  }
}, {
  timestamps: false
})

Polls.belongsTo(Houses)

Polls.sync().then(function () {
  // Table created
  console.log(chalk.green('+++line20 model.poll table successfully created'))
}).catch(function (err) {
  console.error('There was an error in model.poll', err)
})

const Poll_Options = sequelize.define('poll_options', {
  text: {
    type: Sequelize.STRING(75)
  }
}, {
  timestamps: false
})

Polls.hasMany(Poll_Options)
Poll_Options.belongsTo(Polls)

Poll_Options.sync().then(function () {
  // Table created
  console.log(chalk.green('+++line39 model.poll_options table successfully created'))
}).catch(function (err) {
  console.error('There was an error in model.poll_options', err)
})

module.exports = {Polls: Polls, Poll_Options: Poll_Options}

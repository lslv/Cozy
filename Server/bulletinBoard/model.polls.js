const Sequelize = require('sequelize')
const sequelize = require('../config/database')
const Houses = require('../houses/model.houses')
const Users = require('../users/model.users')
const chalk = require('chalk')

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

const Poll_Options = sequelize.define('poll_options', {
	text: {
		type: Sequelize.STRING(75)
	}
}, {
	timestamps: false
})

const Votes = sequelize.define('votes', {
}, {
	timestamps: false
})

//Relationships
Polls.belongsTo(Houses)
Polls.belongsTo(Users)
Polls.hasMany(Poll_Options)
Poll_Options.belongsTo(Polls)
Votes.belongsTo(Poll_Options)
Poll_Options.hasMany(Votes)


// Syncing
Polls.sync().then(function () {
	console.log(chalk.green('+++line20 model.poll table successfully created'))
}).catch(function (err) {
	console.error('There was an error in model.poll', err)
})

Poll_Options.sync().then(function () {
	console.log(chalk.green('+++line39 model.poll_options table successfully created'))
}).catch(function (err) {
	console.error('There was an error in model.poll_options', err)
})

Votes.sync().then(function () {
	console.log(chalk.green('+++line55 model.votes table successfully created'))
}).catch(function (err) {
	console.error('There was an error in model.poll_options', err)
})

//Uncomment to drop tables
// Polls.sync({force:true})
// Poll_Options.sync({force:true})
// Votes.sync({force:true})

module.exports = {Polls: Polls, Poll_Options: Poll_Options, Votes: Votes}

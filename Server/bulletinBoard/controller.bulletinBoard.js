const db_post = require('../bulletinBoard/model.posts')
const db_poll = require('../bulletinBoard/model.polls')
const sequelize = require('../config/database')
const Promise = require('bluebird')

module.exports = {
	addPost: (req, res) => {
		db_post.Posts.create({
			title: req.body.title,
			message: req.body.message,
			house_id: req.body.house_id,
			user_id: req.body.user_id
		})
      .then(createdPost => res.status(201).send(createdPost))
      .catch(err => res.status(404).send(err))
	},

	getPosts: (req, res) => {
		db_post.Posts.findAll({
			where: { house_id: req.query.house_id }
		})
      .then(queriedPosts => res.status(200).json(queriedPosts))
      .catch(err => res.status(404).send(err))
	},

	editPost: (req, res) => {
		db_post.Posts.findOne({
			where: {
				id: req.body.id
			}
		})
      .then((postToUpdate) => {
	postToUpdate.update({
		message: req.body.message
	})
	res.status(200).send(postToUpdate)
})
      .catch(error => res.status(404).send(error))
	},

	deletePost: (req, res) => {
    // delete works similarly to a get req - Data should come through as a query
		db_post.Posts.findOne({
			where: { id: req.query.id}
		})
      .then(post => post.destroy())
      .then(() => res.status(200).send('row deleted'))
      .catch(error => res.status(404).send(error))
	},

	addPoll: (req, res) => {
		console.log('req body', req.body)
		db_poll.Polls.create({
			question: req.body.question,
			houseId: req.body.houseId,
			userId: req.body.userId
		})
        .then((createdPoll) => {
	return Promise.all(req.body.options.map((option) => {
		return db_poll.Poll_Options.create({
			text: option,
			pollId: createdPoll.dataValues.id
		})
	}))
})
  		.then(poll => res.status(201).send(poll))
  		.catch(err => res.status(404).send(err))
	},

	getPolls: (req, res) => {
		db_poll.Polls.findAll({
			where: {
				houseId: req.query.houseId
			},
			group: ['poll_options.id', 'polls.id'],
			attributes: ['question', 'userId'],
			include: [ 
				{
					model: db_poll.Poll_Options,
					attributes: [
					['id', 'optionId'], 'text', 
					[sequelize.fn('COUNT', sequelize.col('poll_options.votes.id')), 'voteCount']],
					include: {
						model: db_poll.Votes,
						attributes: []
					}
				}
			],
		})
      .then(poll => res.status(200).json(poll))
      .catch(error => res.status(404).send(error))
	},

	deletePoll: (req,res) => {
		//Have to find all options and votes associated with it
		db_poll.Polls.findOne({
			where: { id: req.query.id}
		})
      .then(poll => poll.destroy())
      .then(() => res.status(200).send('poll deleted'))
      .catch(error => res.status(404).send(error))
	},

	vote: (req, res) => {
		console.log('req body', req.body)
		db_poll.Votes.create({
			pollOptionId: req.body.pollOptionId,
			userId: req.body.user_id
		})
	  .then(()=> res.sendStatus(201))
      .catch(error => res.status(404).send(error))
	},

	getVotes: (req,res) => {
		db_poll.Votes.findAll()
		.then(votes => res.status(200).send(votes))
		.catch(err => res.status(404).send(err))
	}
}

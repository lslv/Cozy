const rating_tables = require('../ratings/model.ratings')

module.exports = {

	find_user: (req, res) => {

	},

	rate_user: (req, res) => {
		User_Ratings.create({
			star: req.body.star,
			review: req.body.review,
		})
  .then(createdUser => res.status(200).send(createdUser))
  .catch(err => res.status(400).send(err))
	},

	edit_rating: (req, res) => {
		// User_Ratings
	},

	delete_rating: (req, res) => {

	}

}

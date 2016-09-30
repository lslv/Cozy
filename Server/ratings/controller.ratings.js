const rating_tables = require('../ratings/model.ratings')
let Users = require('../users/model.users')
let chalk = require('chalk')

module.exports = {


// find user takes in a username. Need: user_name, Gives: an array of star/reviews that is under that user_name


	// find_user: (req, res) => {
	// 	User.findall({}).then
	// },

//post on a user a star rating and a review. Need: reviewed_by, review_on, star, review, Gives: success or error (you already posted a review, or system error)

//req.body.reviewed_by: 'Bob',
//req.body.review_on: 'Shirley',
//req.body.star: '5',
//req.body.review:'She's my wife'

//1) find the user that is being reviewed by username
//2) find the user that is writing the review
//3) insert the review with the

	rate_user: (req, res) => {

//finds the id of ther user being reviewed
		let firstPromise = Users.findAll({
			where: {
				user_name: req.body.review_on
			}
		}).then(reviewing_user => {
			let review_on_userId = reviewing_user[0].dataValues.id
			console.log( chalk.cyan('+++line 40 controller.rating user: '), review_on_userId)
		}).catch(err => {
			console.log(chalk.cyan('+++line 42 there is a problem with reviewed on user: '), err)
			res.status(400).send(err)
		})

// finds the id of the user who wrote the review
		let secondPromise = Users.findAll({
			where: {
				user_name: req.body.reviewed_by
			}
		}).then(reviewed_user => {
			let reviewed_by_userId = reviewed_user[0].dataValues.id
			console.log(chalk.cyan('+++line 53 controller.rating reviewed_by_userId: ') , reviewed_by_userId)
		}).catch(err => {
			console.log(chalk.cyan('+++line 55 there is a problem with reviewed by user: '), err)
			res.status(400).send(err)
		})

//posts the review into the table
		let thirdPromise = rating_tables.User_Ratings.create({
			reviewed_by: reviewing_user[0].dataValues.id,
			star: req.body.star,
			review: req.body.review
		}).then((created_review) => {
			console.log(chalk.cyan('+++line66 this is the CREATED_REVIEW: '), created_review.dataValues)
			res.send(200)
		}).catch((err) => {
			console.log(chalk.cyan('+++line68 there is an error in creating review!'))
			res.status(400).send(err)
		})


		Promise.all([firstPromise,secondPromise]).then(thirdPromise).catch((err) => {
			console.log(chalk.cyan('+++line75 there is an error in promise.all: '), err)
			res.status(400).send(err)
		})


	}//,

//

	// edit_rating: (req, res) => {
	// 	// User_Ratings
	// },
  //
  // //
  //
	// delete_rating: (req, res) => {
  //
	// }

}

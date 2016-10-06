const rating_tables = require('../ratings/model.ratings')
let Users = require('../users/model.users')
let chalk = require('chalk')

module.exports = {


// find user takes in a username. Need: user_name, Gives: an array of star/reviews that is under that user_name


	find_user_ratings: (req, res) => {
		Users.findall({
			where:{
				user_name: req.body.username
			}
		}).then((reviewed_user)=>{
			console.log(chalk.cyan('this is the retrieved user'),user[0].dataValues.id)
			reviewed_user.findAll({
				include: [{
					model: Ratings
				}]
			}).then((reviews)=>{
				console.log(chalk.cyan('these are the '))
			}).catch()

			res.status(200).send()

		}).catch((err)=>{
			console.log(err);
			res.status(400).send('There is no user to this username!');
		})
	},

//post on a user a star rating and a review. Need: reviewed_by, review_on, star, review, Gives: success or error (you already posted a review, or system error)

	rate_user: (req, res) => {
		console.log(chalk.cyan('This is req.body in rate_user: '), req.body);

	//posts the review into the table
		rating_tables.User_Ratings.create({
				reviewed_by: req.body.reviewed_by,
				star: req.body.star,
				review: req.body.review
		}).then((created_review) => {
			console.log(chalk.cyan('+++line66 this is the CREATED_REVIEW ID: '), created_review.dataValues.id)

			rating_tables.User_Ratings_Join_Table.create({
				userRatingId: created_review.dataValues.id,
				user_id: req.body.review_on
			})
			.then(()=>{console.log('SUCCESS')});

			res.sendStatus(201);
		}).catch((err) => {
			console.log(chalk.cyan('+++line68 there is an error in creating review!'))
			res.status(500).send(err)
		})
	}


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



// finds the id of the user who wrote the review
		// Users.findAll({
		// 	where: {
		// 		id: req.body.reviewed_by
		// 	}
		// }).then(reviewed_user => {
		//
		// 	console.log(chalk.cyan('+++line 53 findAll found: ') , reviewed_user[0].dataValues)
		//
		// 	createReview();
		//
		// }).catch(err => {
		// 	console.log(chalk.cyan('+++line 55 there is a problem with reviewed by user: '), err)
		// 	res.status(400).send(err)
		// });


//finds the id of the user being reviewed
		// let firstPromise = Users.findAll({
		// 	where: {
		// 		user_name: req.body.review_on
		// 	}
		// }).then(reviewing_user => {
		// 	let review_on_userId = reviewing_user[0].dataValues.id
		// 	console.log( chalk.cyan('+++line 40 controller.rating user: '), review_on_userId)
		// }).catch(err => {
		// 	console.log(chalk.cyan('+++line 42 there is a problem with reviewed on user: '), err)
		// 	res.status(400).send(err)
		// })

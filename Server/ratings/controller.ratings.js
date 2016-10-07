const rating_tables = require('../ratings/model.ratings')
let Users = require('../users/model.users')
let chalk = require('chalk')

module.exports = {


// find user takes in a username. Need: user_name, Gives: an array of star/reviews that is under that user_name

	find_user_ratings: (req, res) => {
		console.log(chalk.cyan('this is req.query'),req.query);

		Users.findAll({
			where:{
				user_name: req.query.username
			}
		}).then((reviewed_user)=>{
			let user_id = reviewed_user[0].dataValues.id

			return rating_tables.User_Ratings_Join_Table.findAll({
				where:{
					user_id: reviewed_user[0].dataValues.id
				}
			}).then((reviews)=>{
				console.log(reviews)
				let review_id=[]
				for(var i = 0; i<reviews.length; i++){
					review_id.push(reviews[i].userRatingId);
				}

				return Promise.all(review_id.map((id)=>{
					return rating_tables.User_Ratings.findAll({
						where:{
							id: id
						}
					})
				})) //1) there has to be a better way than this 2) It's nested arrays!
				.then((obj)=>{
					obj.unshift(reviewed_user[0].dataValues.id)
					res.status(200).send(obj);
				})
			})
		}).catch((err)=>{
			console.log(err);
			res.status(400).send('There is no user to this username!')
		})
	},

//post on a user a star rating and a review. Need: reviewed_by, review_on, star, review, Gives: success or error (you already posted a review, or system error)

	rate_user: (req, res) => {
		console.log(req.body, 'hello')
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
		 	}).then(()=>{
		 		console.log('SUCCESS')
		 	});
		 	res.sendStatus(201);
		 }).catch((err) => {
		 	console.log(chalk.cyan('+++line68 there is an error in creating review!'))
		 	res.status(500).send(err)
		 })
	}


	 edit_rating: (req, res) => {
	 	 User_Ratings
	 },
  
  
  
	 delete_rating: (req, res) => {
  
	 }

}

const Users = require('../users/model.users')
const bcrypt = require('bcryptjs')

module.exports = {

	signup: (req, res) => {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(req.body.password, salt, (err, hash) =>{
				Users.create({
					user_name: req.body.username,
					first_name: req.body.firstname,
					last_name: req.body.lastname,
					email: req.body.email,
					password: hash,
					pay_percentage: 0
				})
			})
		})
      .then(createdPost => res.status(200).send(createdPost))
      .catch(err => res.status(400).send(err))
	},

	login: (req, res) => {
		Users.findAll({
			where: { user_name: req.body.username }
		})
      .then(user => {
	bcrypt.compare(req.body.password, user[0].password, (err, password) => {
		if(user[0].user_name === req.body.username && password){
          //make this send token and redacted user object
			res.status(200).json(user[0])
		}else{
			res.status(400).send('wrong username or password')
		}
	})
})
.catch(err => res.status(400).send(err))
	},

	houseIdUsers: (req ,res) => {
		console.log('getting user by house id', req.query)
		Users.findAll({
			where: { house_id: req.query.house_id }
		})
    .then(users =>{
	res.status(200).json(users)
})
    .catch(err => res.status(400).send(err))
	},

	userById: (req, res) => {
		Users.findAll({
			where: { id: parseInt(req.headers.userid) }
		})
    .then(user => {
	res.status(200).json(user[0])
})
    .catch(err => res.status(401).send(err))
	}
}

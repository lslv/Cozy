const Users = require('../users/model.users')

module.exports = {

	signup: (req, res) => {
		Users.create({
			user_name: req.body.username,
			first_name: req.body.firstname,
			last_name: req.body.lastname,
			email: req.body.email,
			password: req.body.password,
			pay_percentage: 0
		})
      .then(createdPost => res.status(200).send(createdPost))
      .catch(err => res.status(400).send(err))
	},

	login: (req, res) => {
		Users.findAll({
			where: { user_name: req.body.username }
		})
      .then(user => {
	if(user[0].user_name === req.body.username && user[0].password === req.body.password){
          //make this send token and redacted user object
		res.status(200).json(user[0])
	}else{
		res.status(400).send('wrong username or password')
	}
})
      .catch(err => res.status(400).send(err))
	},

	houseIdUsers: (req ,res) => {
		Users.findAll({
			where: { house_id: parseInt(req.headers.houseid) }
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

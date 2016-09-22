const Users = require('../users/model.users')

module.exports = {

  login: (req, res) => {
    Users.findAll({
      where: { user_name: req.body.username }
    })
      .then(user => {
        if(user[0].user_name === req.body.username && user[0].password === req.body.password){
          //make this send token and redacted user object
          res.status(200).json(user[0])
        }else{
          res.status(401).send('wrong username or password')
        }
      })
      .catch(err => res.status(401).send(err))
  },

  houseIdUsers: (req ,res) => {
    Users.findAll({
      where: { house_id: parseInt(req.headers.houseid) }
    })
    .then(users =>{
      res.status(200).json(users)
    })
    .catch(err => res.status(401).send(err))
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

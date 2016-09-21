const db = require('../bulletinBoard/model.posts')

module.exports = {
  addPost: (req, res) => {
    console.log('req body', req.body)
    db.Posts.create({
      title: req.body.title,
      message: req.body.message,
      house_id: req.body.house_id,
      user_id: req.body.user_id
    })
      .then((user) => {
        res.status(200).send(user)
      })
      .catch((err) => {
        res.status(404).send(err)
      })
  }
}

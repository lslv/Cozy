const db = require('../bulletinBoard/model.posts')

module.exports = {
  addPost: (req, res) => {
    db.Posts.create({
      title: req.body.title,
      message: req.body.message,
      house_id: req.body.house_id,
      user_id: req.body.user_id
    })
      .then(createdPost => res.status(200).send(createdPost))
      .catch(err => res.status(404).send(err))
  },

  getPosts: (req, res) => {
    // For testing purposes, now grabbing the data where title = test
    // Eventually, it will grab all from House_id

    db.Posts.findAll({
      where: { title: req.query.title }
    })
      .then(queriedPosts => res.status(200).json(queriedPosts))
      .catch(err => res.status(404).send(err))
  },

  deletePost: (req, res) => {
    console.log('req query', req.query)
    // delete works similarly to a get req - Data should come through as a query
    db.Posts.findOne({
      where: { id: req.query.id}
    })
      .then(post => post.destroy())
      .then(() => res.status(200).send('row deleted'))
      .catch(error => res.status(404).send(error))
  }
}

const db = require('../bulletinBoard/model.posts')

module.exports = {
  addPost: (req, res) => {
    db.Posts.create({
      title: req.body.title,
      message: req.body.message,
      house_id: req.body.house_id,
      user_id: req.body.user_id
    })
      .then((createdPost) => {
        res.status(200).send(createdPost)
      })
      .catch((err) => {
        res.status(404).send(err)
      })
  },

  getPosts: (req, res) => {
    // For testing purposes, now grabbing the data where title = test
    // Eventually, it will grab all from House_id

    console.log('getPosts query: ', req.query)
    db.Posts.findAll({
      where: { title: req.query.title }
    })
      .then((queriedPosts) => {
        res.status(200).json(queriedPosts)
      })
      .catch((err) => {
        res.status(404).send(err)
      })
  }
}

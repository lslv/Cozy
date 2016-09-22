const db = require('../chores/model.chores')

module.exports = {
  postChore: (req, res) => {
    db.Chores.create({
      chore_name: req.body.chore_name,
      user_turn: 0,
      day:req.body.day,
      house_id: req.body.house_id,
    })
      .then((createdPost) => {
        res.status(200).send(createdPost)
      })
      .catch((err) => {
        res.status(404).send(err)
      })
  },

  getChores: (req, res) => {
    console.log('getChores query: ', req.query)
    db.Chores.findAll({
      where: { house_id: req.query.house_id }
    })
      .then((queriedPosts) => {
        res.status(200).json(queriedPosts)
      })
      .catch((err) => {
        res.status(404).send(err)
      })
  },

  deleteChore: (req, res) => {
    console.log('deleteChore query: ', req.query)
    db.Chores.findOne({
      where: {id: req.query.id }
    })
      .then((choreToDelete) => {
        return choreToDelete.destroy()
      })
      .then((deletedChore)=>{
        res.status(200).json(deletedChore)
      })
      .catch((err) => {
        res.status(404).send(err)
      })
  }
}

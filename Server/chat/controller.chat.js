const db = require('../chat/model.chat')
const Promise = require('bluebird')

module.exports = {

	createRoom: (req, res) => {
		db.Room_Names.create({
			room_name: req.body.room_name
		})
		.then((room) => {
			return Promise.all(req.body.user_id_list.map((id) => {
				return db.ChatRooms.create({
					//for some reason, double underscore
					room__name_id: room.dataValues.id,
					user_id: id
				})
			}))
		})
		.then(chatRoom => res.status(201).json(chatRoom))
		.catch(error => res.status(404).send(error))
	}


}
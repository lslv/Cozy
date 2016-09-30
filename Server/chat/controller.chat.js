const db = require('../chat/model.chat')
const Promise = require('bluebird')
const _ = require('lodash')

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
		.then(chatRoom => res.status(201).json({
			room_name: req.body.room_name,
			chatRoom: chatRoom
		}))
		.catch(error => res.status(404).send(error))
	},

	getUserRooms: (req, res) => {
		db.ChatRooms.findAll({
			where: {
				user_id: req.query.user_id
			}
		})
		.then((roomsCurrentUser) => {
			var whereConditions=roomsCurrentUser.map(room=>{
				return {
					room__name_id:{
						$eq:room.room__name_id
					}
				}
			})
			db.ChatRooms.findAll({
				where:{
					$or: whereConditions
				}
			})
			.then(result => {
				const rooms = result.map((obj) => {
					return {
						room_id: obj.dataValues.room__name_id,
						users: []
					}
				})
				const uniqueRooms = _.uniqBy(rooms, (obj) => {
					return obj.room_id
				})
				for(let obj of uniqueRooms) {
					for(let o of result) {
						if(obj.room_id == o.room__name_id) {
							obj.users.push(o.user_id)
						}
					}
				}
				let room_names_list = _.map(uniqueRooms, (room) => { 
					return {
						id: {
							$eq: room.room_id
						}
					}
				})
				db.Room_Names.findAll({
					where: {
						$or: room_names_list
					}
				})
				.then(rooms => {

					for(let room of uniqueRooms) {
						for(let name of rooms) {
							if(room.room_id == name.id) {
								room.room_id = name.room_name
							}
						}
					}
 


					res.json({rooms: rooms, uniqueRooms: uniqueRooms})
				})

				// res.status(200).json(room_names_list)
			})
		})
		.catch(error => res.status(404).send(error))


	}


}
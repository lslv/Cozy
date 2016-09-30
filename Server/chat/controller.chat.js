const db = require('../chat/model.chat')
const Promise = require('bluebird')
const Users = require('../users/model.users')
const _ = require('lodash')

module.exports = {

	createRoom: (req, res) => {
		db.Room_Names.create({
			room_name: req.body.room_name
		})
		.then((room) => {
			Promise.all(req.body.user_id_list.map((id) => {
				return db.ChatRooms.create({
					//for some reason, double underscore
					RoomNameId: room.dataValues.id,
					user_id: id
				})
			}))
			.then(chatRoom => res.status(201).json({
				id: room.dataValues.id,
				room_name: req.body.room_name,
				chatRoom: chatRoom
			}))
		})
		.catch(error => res.status(404).send(error))
	},

	getUserRooms: (req, res) => {
		db.ChatRooms.findAll({
			where: {
				user_id: req.query.user_id
			}
		})
		.then((roomsCurrentUser) => {
			console.log('roomsCurrentUser', roomsCurrentUser)
			var whereConditions=roomsCurrentUser.map(room=>{
				return {
					RoomNameId:{
						$eq:room.RoomNameId
					}
				}
			})
			console.log('whereConditions', whereConditions)
			db.ChatRooms.findAll({
				where:{
					$or: whereConditions
				}
			})
			.then(result => {
				const rooms = result.map((obj, i) => {
					return {
						id: i,
						room_id: obj.dataValues.RoomNameId,
						users: []
					}
				})
				const uniqueRooms = _.uniqBy(rooms, (obj) => {
					return obj.room_id
				})
				for(let obj of uniqueRooms) {
					for(let o of result) {
						if(obj.room_id == o.RoomNameId) {
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
					res.status(200).json(uniqueRooms)
				})
			})
		})
		.catch(error => res.status(404).send(error))

	}


}
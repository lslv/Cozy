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
					RoomNameId: room.dataValues.id,
					user_id: id
				})
			}))
			.then(chatRoom => { 
				const user_id_list = _.map(chatRoom, (room) => room.dataValues.user_id)

				res.status(201).json(
				{
				id: room.dataValues.id,
				room: req.body.room_name,
				users: user_id_list
				}
			)})
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
			var whereConditions=roomsCurrentUser.map(room=>{
				return {
					RoomNameId:{
						$eq:room.RoomNameId
					}
				}
			})
			db.ChatRooms.findAll({
				where:{
					$or: whereConditions
				}
			})
			.then(roomsContainingUser => {
				const rooms = roomsContainingUser.map((obj, i) => {
					return {
						id: i,
						room: obj.dataValues.RoomNameId,
						users: []
					}
				})
				const uniqueRooms = _.uniqBy(rooms, (obj) => {
					return obj.room
				})
				for(let obj of uniqueRooms) {
					for(let o of roomsContainingUser) {
						if(obj.room == o.RoomNameId) {
							obj.users.push(o.user_id)
						}
					}
				}
				let room_names_list = _.map(uniqueRooms, (room) => { 
					return {
						id: {
							$eq: room.room
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
							if(room.room == name.id) {
								room.room = name.room_name
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
module.exports = (io) => {

	let currentUsers= {}

	io.on('connection', (socket) => {
		console.log('connected')

		socket.on('joinRoom', (req) => {
			currentUsers[socket.id] = req 
			socket.join(req.room)
			//change to broadcast for production purposes
			console.log('currentUsers', currentUsers)
			console.log('socket id', socket.id)
			io.to(req.room).emit('joinRoom', req)
		})

		socket.on('message', (message) => {
			io.to(currentUsers[socket.id].room).emit('message', message)
		})

		socket.on('isTyping', (user) => {
			const id = socket.id
			console.log('currentUsers', currentUsers)
			console.log('id', id)
			console.log('user w/ id', currentUsers[id])
			// console.log('room in isTyping', currentUsers[socket.id])
			io.emit('isTyping', user)
		})

		socket.on('disconnect', () => {
			const userData = currentUsers[socket.id]

			if(currentUsers[socket.id]) {
				socket.leave(userData.room)
				io.to(userData.room).emit('userLeft', userData)
			}

			delete currentUsers[socket.id]
		})


	})



}
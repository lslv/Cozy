module.exports = (io) => {

	let currentUsers= {}

	io.on('connection', (socket) => {
		console.log('connected')

		socket.on('message', (message) => {
			io.emit('message', message)
		})

		socket.on('isTyping', (user) => {
			io.emit('isTyping', user)
		})

		socket.on('joinRoom', (req) => {
			currentUsers[socket.id] = req 
			console.log('currentUsers', currentUsers[socket.id])
			socket.join(req.room)

			socket.broadcast.to(req.room).emit('userEntered', req)
		})

		socket.on('disconnect', () => {
			const userData = currentUsers[socket.id]

			if(currentUsers[socket.id]) {
				socket.leave(userData.room)

				io.to(userData.room).emit('userLeft', userData)
			}
		})


	})



}
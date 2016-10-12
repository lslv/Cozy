module.exports = (io) => {

	let currentUsers= {}

	io.on('connection', (socket) => {
		console.log('connected')

		socket.on('joinRoom', (req) => {
			console.log('req', req)
			currentUsers[socket.id] = req 
			socket.join(req.room)
			io.to(req.room).emit('joinRoom', req)
		})

		socket.on('message', (message) => {
			io.to(currentUsers[socket.id].room).emit('message', message)
		})

		socket.on('isTyping', (user) => {
			io.to(currentUsers[socket.id].room).emit('isTyping', user)
		})

		socket.on('disconnect', () => {
			const userData = currentUsers[socket.id]

			if(currentUsers[socket.id]) {
				socket.leave(userData.room)
				io.to(userData.room).emit('disconnect', userData)
			}
			delete currentUsers[socket.id]
		})


	})



}
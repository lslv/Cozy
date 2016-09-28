module.exports = (io) => {

	io.on('connection', (socket) => {
		console.log('connected')

		socket.on('message', (message) => {
			console.log('message on server', message)
			io.emit('message', message)
		})
	})



}
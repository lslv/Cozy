module.exports = (io) => {

	io.on('connection', (socket) => {
		console.log('connected')

		socket.on('message', (message) => {
			io.emit('message', message)
		})
	})



}
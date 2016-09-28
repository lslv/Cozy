module.exports = (io) => {

	io.on('connection', (socket) => {
		console.log('connected')

		io.emit('userEntered', { for: 'everyone' })

		socket.on('message', (message) => {
			io.emit('message', message)
		})
	})



}
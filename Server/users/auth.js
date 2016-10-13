module.exports = {

	clientID: process.env.clientID || '1212939108780754',
	clientSecret: process.env.clientSecret || '1eb441d44bdacfb31194cc16e06f4eb5',

	serialize: function(obj) {
		let str = []
		for(var p in obj)
			if (obj.hasOwnProperty(p)) {
				str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
			}
		return str.join('&')
	}

}

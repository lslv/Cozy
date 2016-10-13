module.exports = {

	clientID: process.env.clientID,
	clientSecret: process.env.clientSecret,

	serialize: function(obj) {
		let str = []
		for(var p in obj)
			if (obj.hasOwnProperty(p)) {
				str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
			}
		return str.join('&')
	}

}

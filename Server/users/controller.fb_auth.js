const Users = require('./model.users')
const fb_auth = require('./auth')

module.exports = (passport, Strategy, app, port) => {

	//Change to user id to query to & from db to match profile w/ user
	passport.serializeUser((user, done) => {
		done(null, user.id)
	})
	passport.deserializeUser((obj, done) => {
		done(null, obj)
	})

	//FB AUTH middleware
	passport.use(new Strategy({
		clientID: fb_auth.clientID,
		clientSecret: fb_auth.clientSecret,
		callbackURL: `http://localhost:${port}/api/users/login/facebook/callback`,
		profileFields: ['id','email','displayName', 'picture']
	},
	function(accessToken, refreshToken, profile, done) {
		console.log('fb profile in fb_auth', profile)
		return done(null, profile)
	}))



	app.use(passport.initialize())
	app.use(passport.session())



}
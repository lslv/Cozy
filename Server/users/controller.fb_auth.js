const Users = require('./model.users')
const fb_auth = require('./auth')

module.exports = (passport, Strategy, app, port) => {


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
		callbackURL: `https://cozy-app.herokuapp.com/api/users/login/facebook/callback`,
		profileFields: ['id','email','displayName', 'picture']
	},
	function(accessToken, refreshToken, profile, done) {
		Users.findOne({
				where: {
					fb_id: profile.id
				}
			})
			.then((user) => {
				console.log('viv fb profile', profile)
				if(!user) {
					Users.create({
						fb_id: profile.id,
						user_name: profile.displayName,
						email: profile.emails[0].value,
						fb_picture: profile.photos[0].value
					})
					.then(user => done(null, user))
					.catch(err => console.log('err in fb auth', err))
				} else {
					return done(null, user)
				}

			})

		}))

	app.use(passport.initialize())
	app.use(passport.session())

}

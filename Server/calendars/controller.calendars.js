const Calendars = require('../calendars/model.calendars')

module.exports ={
	addCalendar: (req, res)=>{
		console.log('addCalendar body', req.body)
		//add the calendar id to the database here
		 console.log(Calendars)
		// res.send('calendar posted')
		Calendars.create({
			calendar_google_id:req.body.calendar_google_id,
			houseId:req.body.houseId
		})
		.then((createdCal)=>{
			res.status(200).send(createdCal)
		})
		.catch((err)=>{
			console.log(err)
			res.status(404).send(err)
		})
	}
}
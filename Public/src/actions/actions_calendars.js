import axios from 'axios'
export const ADD_CALENDAR = 'ADD_CALENDAR'

export function addCalendar(calendarData){

	console.log('adding calendar with data ', calendarData)
	const payload= axios.post('http://localhost:1337/api/calendars/addCalendar', calendarData) //hardcoded in local host

	return {
		type: ADD_CALENDAR,
		payload: payload
	}
	
}
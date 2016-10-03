import axios from 'axios'
export const ADD_CALENDAR = 'ADD_CALENDAR'
export const GET_CALENDAR = 'GET_CALENDAR'

export function addCalendar(calendarData){

	console.log('adding calendar with data ', calendarData)
	const payload= axios.post('http://localhost:1337/api/calendars/addCalendar', calendarData) //hardcoded in local host

	return {
		type: ADD_CALENDAR,
		payload: payload
	}
	
}

export function getCalendar(houseId=1){ //hardcoded default value of 1 

	console.log('retrieivng house google calendar of', houseId)
	const payload= axios.get('http://localhost:1337/api/calendars/getCalendar', {
		params:{house_id:houseId}})

	return {
		type:GET_CALENDAR,
		payload: payload
	}


}
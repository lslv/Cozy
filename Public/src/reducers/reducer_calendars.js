import { ADD_CALENDAR } from '../actions/actions_calendars'
import { GET_CALENDAR } from '../actions/actions_calendars'

const INITIAL_STATE=null

export default function(state = INITIAL_STATE , action) {
	switch (action.type) {
	case ADD_CALENDAR:
		console.log('adding calendar to redux state')
		console.log('payload ', action.payload )
		return action.payload.data.calendar_google_id
	case GET_CALENDAR:
		console.log('getting calendar to redux state')
		console.log('payload ', action.payload )
		if(typeof action.payload.data === 'object')
			return action.payload.data.calendar_google_id
		else
			return state
	default:
		return state
	}
}


//have not written get action

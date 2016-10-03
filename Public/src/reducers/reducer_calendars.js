import { ADD_CALENDAR} from '../actions/actions_calendars'

const INITIAL_STATE=null

export default function(state = INITIAL_STATE , action) {
	switch (action.type) {
	case ADD_CALENDAR:
		console.log('adding calendar to redux state')
		console.log('payload ', action.payload )
		return state
	default:
		return state
	}
}

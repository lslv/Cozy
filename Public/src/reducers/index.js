import { combineReducers } from 'redux'
import PostReducer from './reducer_posts'
import PollReducer from './reducer_polls'
import VotesReducer from './reducer_votes'
import ChoreReducer from './reducer_chores'
import QueueReducer from './reducer_queues'
import UserReducer from './reducer_users'
import ChatReducer from './reducer_chats'
import HousesReducer from './reducer_join_search'
import CalendarReducer from './reducer_calendars'
import BillingReducer from './reducer_billing'
import {reducer as formReducer} from 'redux-form'

const rootReducer = combineReducers({
	posts: PostReducer,
	polls: PollReducer,
	chores: ChoreReducer,
	queues: QueueReducer,
	users: UserReducer,
	votes: VotesReducer,
	form: formReducer,
	chats: ChatReducer,
<<<<<<< 915e458c2587e2bbfbe74e44c3397bf94dbedc40
	calendar: CalendarReducer,
	houses: HousesReducer
=======
	houses: HousesReducer,
	bills: BillingReducer
>>>>>>> [bug]webpack not loading
})

export default rootReducer

import { combineReducers } from 'redux'
import PostReducer from './reducer_posts'
import PollReducer from './reducer_polls'
import ChoreReducer from './reducer_chores'
import QueueReducer from './reducer_queues'
import UserReducer from './reducer_users'
import {reducer as formReducer} from 'redux-form'

const rootReducer = combineReducers({
  posts: PostReducer,
  polls: PollReducer,
  chores: ChoreReducer,
  queues: QueueReducer,
  users: UserReducer,
  form: formReducer
})

export default rootReducer

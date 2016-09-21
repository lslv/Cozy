import { combineReducers } from 'redux'
import PostReducer from './reducer_posts'
import ChoreReducer from './reducer_chores'
import {reducer as formReducer} from 'redux-form'

const rootReducer = combineReducers({
  posts: PostReducer,
  chores: ChoreReducer,
  form: formReducer
})

export default rootReducer

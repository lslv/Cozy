import { ADD_POLL, GET_POLLS, DELETE_POLL, VOTE } from '../actions/actions_polls'

export default function(state = [], action) {
		console.log('action', action)
	switch(action.type) {
		case ADD_POLL: {
			//right now only see poll on refresh
			return [...state]
		}
		case GET_POLLS: {
			let data = action.payload.data
			//always get unique polls so they doesn't duplicate on multiple calls
			let polls = data.filter((poll, i) => {
				return data.indexOf(poll) === i
			})
			//push each poll obj to array
			let allPolls = []
			for (let poll of polls) {
				allPolls.push(poll)
			}
			return allPolls
		}
		case DELETE_POLL: {
			let index = [...state].indexOf(action.payload)
			return [...state.slice(0, index), ...state.slice(index + 1)]
		}
		case VOTE: {
			console.log('action', action.payload)
			console.log('state', [...state])

			let temp;
			let index;
			//Find the matching poll in state and set to temp obj
			state.forEach((poll, i) => {
				for(let option of poll.poll_options) {
					if(option.optionId == action.payload) {
						temp = poll
						index = i
					}
				}
			})
			//update the vote count
			for(let option of temp.poll_options) {
				if(option.optionId == action.payload) {
					console.log('before update', option)
					option.voteCount++
					console.log('after update', option)
				}
			}
			
			return [...state.slice(0, index), temp, ...state.slice(index + 1)]
		}

	}
	return state
}
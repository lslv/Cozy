import axios from 'axios'

export const ADD_POST = 'ADD_POST'

export function addPost (postData) {

  // Post data comes in as { title: 'title', message: 'msg' }
  // Grab user_id and house_id from local storage and attach to postData object
  // So payload should be set as { postMsg: 'User input', user_id: 1, house_id:2 }
  // Post updated postData obj to the DB
  // on return, attach postData to the payload

  // Dummy data
  // postData.username = 'Lee'
  // postData.house_id = '2'

  axios.post('/api/bulletinBoard', postData)

  return {
    type: ADD_POST,
    payload: postData
  }
}

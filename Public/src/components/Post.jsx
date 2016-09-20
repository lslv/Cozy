import React from 'React'
import { ListGroupItem } from 'react-bootstrap'

export default (props) => {
  return (
    <ListGroupItem>
      <p>
        Username:
        {props.data.username}
      </p>
      <p>
        Message:
        {props.data.message}
      </p>
    </ListGroupItem>
  )
}

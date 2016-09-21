import React from 'react'
import { ListGroupItem } from 'react-bootstrap'

export default (props) => {
  return (
    <ListGroupItem>
      <p>
        Username:
        {props.data.username}
      </p>
      <p>
        Title:
        {props.data.title}
      </p>
      <p>
        Message:
        {props.data.message}
      </p>
    </ListGroupItem>
  )
}

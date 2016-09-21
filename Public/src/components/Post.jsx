import React from 'react'
import { ListGroupItem } from 'react-bootstrap'

export default (props) => {
  return (
    <ListGroupItem>
      <p>
        User: This will have the user name / pic
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

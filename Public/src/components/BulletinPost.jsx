import React from 'react'
import { Col, ListGroup, ListGroupItem, ButtonGroup, Button } from 'react-bootstrap'

export default (props) => {
  return (
    <ListGroupItem>
      <input placeholder='Add a post-it message' />
      <ButtonGroup>
        <Button type='submit' className='btn btn-info'>
          Leave a message
        </Button>
      </ButtonGroup>
    </ListGroupItem>
  )
}

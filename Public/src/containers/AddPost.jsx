import React, { Component } from 'react'
import { Col, ListGroup, ListGroupItem, ButtonGroup, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { addPost } from '../actions/index'

class AddPost extends Component {
  constructor (props) {
    super(props)

    this.state = { postMsg: ''}
    this.onInputChange = this.onInputChange.bind(this)
  }

  onInputChange (event) {
    this.setState({ postMsg: event.target.value })
  }

  render () {
    return (
      <ListGroupItem>
        <input placeholder='Add a post-it message' value={this.state.postMsg} onChange={this.onInputChange} />
        <ButtonGroup>
          <Button onClick={this.props.addPost(this.state)} type='submit' className='btn btn-info'>
            Leave a message
          </Button>
        </ButtonGroup>
      </ListGroupItem>
    )
  }
}

function mapStateToProps ({posts}) {
  return {posts}
}

export default connect(mapStateToProps)(AddPost)

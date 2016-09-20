import React, { Component } from 'react'
import { Col, ListGroup, ListGroupItem, ButtonGroup, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { addPost } from '../actions/index'
import { bindActionCreators } from 'redux'

class AddPost extends Component {
  constructor (props) {
    super(props)

    this.state = { message: ''}

    this.onInputChange = this.onInputChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  onInputChange (event) {
    this.setState({ message: event.target.value })
  }

  handleClick () {
    this.props.addPost(this.state)
  }

  render () {
    return (
      <ListGroupItem>
        <input placeholder='Add a post-it message' value={this.state.message} onChange={this.onInputChange} />
        <ButtonGroup>
          <Button onClick={this.handleClick} type='submit' className='btn btn-info'>
            Leave a message
          </Button>
        </ButtonGroup>
      </ListGroupItem>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({addPost}, dispatch)
}

export default connect(null, mapDispatchToProps)(AddPost)

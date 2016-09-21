import React, { Component } from 'react'
import { Col, ListGroup, ListGroupItem, ButtonGroup, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { addPost } from '../actions/index'
import { bindActionCreators } from 'redux'

class AddPost extends Component {
  constructor (props) {
    super(props)

    this.state = { title: '', message: ''}

    this.onMsgInputChange = this.onMsgInputChange.bind(this)
    this.onTitleInputChange = this.onTitleInputChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  onMsgInputChange (event) {
    this.setState({ message: event.target.value })
  }

  onTitleInputChange (event) {
    this.setState({ title: event.target.value })
  }

  handleClick () {
    this.props.addPost(this.state)
    this.setState({ message: '', title: ''})
  }

  render () {
    if (this.state.flag) {
      return <noscript />
    }
    return (
      <ListGroupItem>
        <input placeholder='Add title' value={this.state.title} onChange={this.onTitleInputChange} />
        <input placeholder='Add a post-it message' value={this.state.message} onChange={this.onMsgInputChange} />
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

import React, { Component } from 'react'
import { ListGroupItem, Button, Panel } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { deletePost } from '../actions/index'

class Post extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false

    }

    this.handleDelete = this.handleDelete.bind(this)
    this.handleCollapsible = this.handleCollapsible.bind(this)
    this.handleMessageEdit = this.handleMessageEdit.bind(this)
  }

  handleDelete () {
    this.props.deletePost(this.props.data)
  }

  handleMessageEdit () {
    const message = document.getElementById('message')
    console.log('message text', message.textContent)
  // destroy h3 elem
  // create an input and set the value of it
  // message.parentNode.removeChild(message)
  }

  handleCollapsible () {
    this.setState({ open: !this.state.open })
  }

  render () {
    const post = this.props.data
    return (
      <Panel
        header={post.title}
        collapsible
        expanded={this.state.open}
        onClick={this.handleCollapsible}>
        <h3 id='message'>{post.message}</h3>
        <Button bsStyle='danger' onClick={this.handleDelete}>
          <i className='fa fa-minus-circle' aria-hidden='true'></i>
        </Button>
        <Button bsStyle='warning' onClick={this.handleMessageEdit}>
          <i className='fa fa-pencil' aria-hidden='true'></i>
        </Button>
      </Panel>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({deletePost}, dispatch)
}

export default connect(null, mapDispatchToProps)(Post)

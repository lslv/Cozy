import React, { Component } from 'react'
import { ListGroupItem, Button, Panel } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { deletePost } from '../actions/index'

class Post extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      editMode: false,
      editMessageValue: ''
    }

    this.handleDelete = this.handleDelete.bind(this)
    this.handleCollapsible = this.handleCollapsible.bind(this)
    this.handleMessageEdit = this.handleMessageEdit.bind(this)
    this.toggleMessageEdit = this.toggleMessageEdit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleDelete (e) {
    console.log('e target delete', e.target)
    this.props.deletePost(this.props.data)
  }

  handleInputChange (event) {
    this.setState({ editMessageValue: event.target.value })
  }

  handleMessageEdit () {
    const post = this.props.data
    if (!this.state.editMode) {
      return (
        <h3>{post.message}</h3>
      )
    } else {
      return (
        <div>
          <input value={this.state.editMessageValue} onChange={this.handleInputChange} placeholder={post.message} />
          <Button bsStyle='success'>
            <i className='fa fa-check-circle' aria-hidden='true'></i>
          </Button>
        </div>
      )
    }

  // put an else if to check it the save button has been clicked. Send an action to update the state (in action, do axios put req)
  }

  toggleMessageEdit (e) {
    // stop propogation prevents the event from propogating to parent element and calling the parent event (in this case: panel onClick)
    e.stopPropagation()
    this.setState({ editMode: !this.state.editMode })
  }

  handleCollapsible (e) {
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
        {this.handleMessageEdit()}
        <Button bsStyle='danger' onClick={this.handleDelete}>
          <i className='fa fa-minus-circle' aria-hidden='true'></i>
        </Button>
        <Button bsStyle='warning' onClick={this.toggleMessageEdit}>
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

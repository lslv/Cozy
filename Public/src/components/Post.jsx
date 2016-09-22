import React, { Component } from 'react'
import { ListGroupItem, Button, Panel } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { deletePost } from '../actions/index'

class Post extends Component {
  constructor (props) {
    super(props)
    this.state = { open: false }

    this.handleDelete = this.handleDelete.bind(this)
    this.handleCollapsible = this.handleCollapsible.bind(this)
  }

  handleDelete () {
    this.props.deletePost(this.props.data)
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
        <h3>{post.message}</h3>
        <Button bsStyle='danger' onClick={this.handleDelete}>
          <i className='fa fa-minus-circle' aria-hidden='true'></i>
        </Button>
        <Button bsStyle='warning' onClick={this.handleDelete}>
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

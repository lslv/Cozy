import React, { Component } from 'react'
import { ListGroupItem } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { deletePost } from '../actions/index'

class Post extends Component {
  constructor (props) {
    super(props)

    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete () {
    this.props.deletePost(this.props.data)
  }

  render () {
    return (
      <ListGroupItem>
        <p>
          User: This will have the user name / pic
        </p>
        <p>
          Title:
          {this.props.data.title}
        </p>
        <p>
          Message:
          {this.props.data.message}
        </p>
        <p>
          Delete post: <i className='fa fa-minus-circle' onClick={this.handleDelete} aria-hidden='true'></i>
        </p>
      </ListGroupItem>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({deletePost}, dispatch)
}

export default connect(null, mapDispatchToProps)(Post)

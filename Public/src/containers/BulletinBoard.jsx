import React, { Component } from 'react'
import AddPost from './AddPost'
import { Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import { connect } from 'react-redux'

class BulletinBoard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      flag: false
    }
    this.renderAddPost = this.renderAddPost.bind(this)
    this.togglePost = this.togglePost.bind(this)
  }
  togglePost () {
    this.setState({flag: !this.state.flag})
  }
  renderAddPost () {
    if (this.state.flag) {
      return (<AddPost />)
    }else {
      return <noscript />
    }
  }

  render () {

    // Below ListGroup,
    return (
      <Col xs={12} md={8}>
      <p>
        Add a post-it
        <span onClick={this.togglePost}><i className='fa fa-plus-circle' aria-hidden='true'></i></span>
      </p>
      <ListGroup>
        {this.renderAddPost()}
      </ListGroup>
      </Col>
    )
  }
}

function mapStateToProps ({posts}) {
  return {posts}
}

export default connect(mapStateToProps)(BulletinBoard)

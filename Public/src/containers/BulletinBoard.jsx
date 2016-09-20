import React, { Component } from 'react'
import BulletinPost from '../components/BulletinPost'
import { Col, ListGroup, ListGroupItem } from 'react-bootstrap'

export default class BulletinBoard extends Component {
  constructor (props) {
    super(props)
    this.state = { post: null }
    this.addPost = this.addPost.bind(this)
    this.renderPost = this.renderPost.bind(this)
  }

  addPost () {
    this.setState({ post: <BulletinPost /> })
  }

  render () {
    return (

      <Col xs={12} md={8}>
      <p>
        Add a post-it
        <span onClick={this.addPost}><i className='fa fa-plus-circle' aria-hidden='true'></i></span>
      </p>
      <ListGroup>
        {this.state.post}
      </ListGroup>
      </Col>

    )
  }
}

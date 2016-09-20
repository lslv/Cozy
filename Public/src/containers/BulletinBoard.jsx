import React, { Component } from 'react'
import BulletinPost from '../components/BulletinPost'
import { Col, ListGroup, ListGroupItem } from 'react-bootstrap'

export default class BulletinBoard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      postMsg: '',
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
      return (<BulletinPost />)
    }else {
      return <noscript />
    }
  }

  render () {
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

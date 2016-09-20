import React, { Component } from 'react'
import { Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import { connect } from 'react-redux'

import AddPost from './AddPost'
import Post from '../components/Post'

class BulletinBoard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      flag: false
    }
    this.renderAddPost = this.renderAddPost.bind(this)
    this.togglePost = this.togglePost.bind(this)
    this.renderPosts = this.renderPosts.bind(this)
  }
  togglePost () {
    console.log('this.props', this.props.posts)
    this.setState({flag: !this.state.flag})
  }
  renderAddPost () {
    if (this.state.flag) {
      return (<AddPost />)
    }else {
      return <noscript />
    }
  }

  renderPosts () {
    console.log('this.props in BulletinBoard', this.props.posts)
    return this.props.posts.map((post) => {
      return (
        <Post data={post} key={post.message} />
      )
    })
  }

  render () {
    ('this.props in BulletinBoard', this.props)
    // Below ListGroup, map everything in this.props.posts to return a 'post' component (need to make)
    return (
      <Col xs={12} md={8}>
      <p>
        Add a post-it
        <span onClick={this.togglePost}><i className='fa fa-plus-circle' aria-hidden='true'></i></span>
      </p>
      <ListGroup>
        {this.renderAddPost()}
        {this.renderPosts()}
      </ListGroup>
      </Col>
    )
  }
}

function mapStateToProps ({posts}) {
  return {posts}
}

export default connect(mapStateToProps)(BulletinBoard)

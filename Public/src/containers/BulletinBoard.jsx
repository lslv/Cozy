import React, { Component } from 'react'
import { Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import axios from 'axios'
import { updatePosts } from '../actions/index'
import { bindActionCreators } from 'redux'

import AddPost from './AddPost'
import Post from '../components/Post'

class BulletinBoard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      flag: false
    }
    this.renderAddPost = this.renderAddPost.bind(this)
    this.toggleAddPost = this.toggleAddPost.bind(this)
    this.renderPosts = this.renderPosts.bind(this)
  }

  componentWillMount () {
    // Here, do a get request to post DB to get all posts in the house
    // use this to update the props

    // for testing purposes, get all where title = test
    // Eventually, get all where house_id matches the user's house_id
    axios.get('/api/bulletinBoard/getPosts?title=title')
      .then(response => {
        console.log('successfully got posts from db', response)
        this.props.updatePosts(response.data)
      })
      .catch(error => console.log('error getting posts from db', error))
  }

  toggleAddPost () {
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
    return this.props.posts.map((post) => {
      return (
        <Post data={post} key={post.id} />
      )
    })
  }

  render () {
    console.log('this.props.posts in BulletinBoard', this.props)
    // Below ListGroup, map everything in this.props.posts to return a 'post' component (need to make)
    return (
      <Col xs={12} md={8}>
      <p>
        Add a post-it
        <span onClick={this.toggleAddPost}><i className='fa fa-plus-circle' aria-hidden='true'></i></span>
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

function mapDispatchToProps (dispatch) {
  return bindActionCreators({updatePosts}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BulletinBoard)

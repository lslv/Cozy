import React, { Component } from 'react'
import { Col, ListGroup, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { updatePosts } from '../actions/index'
import { bindActionCreators } from 'redux'

import AddPost from './AddPost'
import Post from '../components/Post'

class BulletinBoard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      flag: false,
      showLoadingIcon: false
    }
    this.renderAddPost = this.renderAddPost.bind(this)
    this.toggleAddPost = this.toggleAddPost.bind(this)
    this.renderPosts = this.renderPosts.bind(this)
  }

  componentWillMount () {
    // grab the posts that exist in the DB and add them to post state
    this.setState({ showLoadingIcon: !this.state.showLoadingIcon })
    this.props.updatePosts()
      .then(() => this.setState({ showLoadingIcon: !this.state.showLoadingIcon }))
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
        <Post data={post} key={post.id || post.message} />
      )
    })
  }

  render () {
    if (this.state.showLoadingIcon) {
      return ( <img src='../../loader.gif' />)
    } else {
      return (
        <Col xs={12} md={8}>
        <Button bsStyle='info' onClick={this.toggleAddPost}>
          Add a post-it <i className='fa fa-plus-circle' aria-hidden='true'></i>
        </Button>
        <ListGroup>
          {this.renderAddPost()}
          {this.renderPosts()}
        </ListGroup>
        </Col>
      )
    }
  }
}

function mapStateToProps ({posts}) {
  return {posts}
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({updatePosts}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BulletinBoard)

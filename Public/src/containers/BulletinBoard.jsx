import React, { Component } from 'react'
import { Col, ListGroup, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { updatePosts } from '../actions/actions_posts'
import { bindActionCreators } from 'redux'

import AddPost from './AddPost'
import Post from './Post'
import AddPoll from './AddPoll'

class BulletinBoard extends Component {
	constructor (props) {
		super(props)
		this.state = {
			postFlag: false,
			pollFlag: false,
			showLoadingIcon: false
		}
		this.renderAddPost = this.renderAddPost.bind(this)
		this.renderAddPoll = this.renderAddPoll.bind(this)
		this.toggleAddPost = this.toggleAddPost.bind(this)
		this.toggleAddPoll = this.toggleAddPoll.bind(this)
		this.renderPosts = this.renderPosts.bind(this)
	}

	componentWillMount () {
    // grab the posts that exist in the DB and add them to post state
		this.setState({ showLoadingIcon: !this.state.showLoadingIcon })
		this.props.getPosts()
      .then(() => this.setState({ showLoadingIcon: !this.state.showLoadingIcon }))
	}

	toggleAddPost () {
		this.setState({postFlag: !this.state.postFlag})
	}

	toggleAddPoll () {
		this.setState({pollFlag: !this.state.pollFlag})
	}

	renderAddPost () {
		if (this.state.postFlag) {
			return (<AddPost />)
		}else {
			return <noscript />
		}
	}

	renderAddPoll () {
		if (this.state.pollFlag) {
			return (<AddPoll />)
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
		if (this.state.showLoadingIcon) {
			return ( <img src='../../loader.gif' />)
		} else {
			return (
        <Col xs={12} md={8}>
        <Button bsStyle='info' onClick={this.toggleAddPost}>
          Add a post-it <i className='fa fa-plus-circle' aria-hidden='true'></i>
        </Button>
        <Button bsStyle='primary' onClick={this.toggleAddPoll}>
          Add a poll <i className='fa fa-plus-circle' aria-hidden='true'></i>
        </Button>
        <ListGroup>
          {this.renderAddPost()}
          {this.renderAddPoll()}
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
	return bindActionCreators({getPosts}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BulletinBoard)

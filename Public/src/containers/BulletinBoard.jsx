import React, { Component } from 'react'
import { Col, ListGroup, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getPosts } from '../actions/actions_posts'
import { getPolls } from '../actions/actions_polls'
import { bindActionCreators } from 'redux'


import Navbar from '../components/Navbar'
import AddPost from './AddPost'
import AddPoll from './AddPoll'
import Post from './Post'
import Poll from './Poll'

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
		this.renderPolls = this.renderPolls.bind(this)
	}

	componentWillMount () {
		const { getPosts, getPolls } = this.props
    	// grab the posts that exist in the DB and add them to post state
		this.setState({ showLoadingIcon: !this.state.showLoadingIcon })
		getPosts()
		getPolls()
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

	renderPolls () {
		return this.props.polls.map((poll) => {
			return (
        <Poll data={poll} key={poll.question} />
      )
		})
	}

	render () {
		if (this.state.showLoadingIcon) {
			return (
				<div>
				<Navbar /> 
				<img src='../../loader.gif' />
				</div>
				)
		} else {
			return (
        <div>
        <Navbar />
        <Button bsStyle='info' onClick={this.toggleAddPost}>
          Add a post-it <i className='fa fa-plus-circle' aria-hidden='true'></i>
        </Button>
        <Button bsStyle='primary' onClick={this.toggleAddPoll}>
          Add a poll <i className='fa fa-plus-circle' aria-hidden='true'></i>
        </Button>
        <ListGroup>
          {this.renderAddPost()}
          {this.renderAddPoll()}
          </ListGroup>
          <ListGroup>
          {this.renderPosts()}
          {this.renderPolls()}
          </ListGroup>
        </div>
      )
		}
	}
}

function mapStateToProps ({posts, polls}) {
	return {posts, polls}
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({getPosts, getPolls}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BulletinBoard)

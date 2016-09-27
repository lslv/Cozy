import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { Button, Panel } from 'react-bootstrap'
import { connect } from 'react-redux'
import { addPoll, deletePoll } from '../actions/actions_polls'
import { vote, getVotes } from '../actions/actions_votes'
import {Chart} from 'react-google-charts'


class Poll extends Component {
	constructor(props) {
		super(props)
		this.state = {
			pollResultsView: false,
			open: false,
			choice: 0,
			hasVoted: false,
			isAuthor: false
		}
		this.handleCollapsible = this.handleCollapsible.bind(this)
		this.setChoice = this.setChoice.bind(this)
		this.voteOnPoll = this.voteOnPoll.bind(this)
		this.toggleResultsView = this.toggleResultsView.bind(this)
		this.pollView = this.pollView.bind(this)
		this.showDelete = this.showDelete.bind(this)
		this.hasVotedOnPoll = this.hasVotedOnPoll.bind(this)
	}

	componentWillMount() {
		const poll = this.props.data
		//Endable editing if the user is the author of the post 
		const user_id = sessionStorage.getItem('id')
		if(user_id == poll.userId) {
			this.setState({ isAuthor: true })
		}
		const { getVotes } = this.props
		getVotes()
		.then(() => this.hasVotedOnPoll())
	}

	hasVotedOnPoll() {
		//Check if the voter has previously voted on the poll
		const poll = this.props.data
		const user_id = sessionStorage.getItem('id')
		const { votes } = this.props
		console.log('this props', this.props)
		let flag = false
		for(let vote of votes) {
			for(let option of poll.poll_options) {
				if(option.optionId == vote.pollOptionId && vote.userId == user_id) {
					flag = true
					break
				}
			}
		}
		if(flag) {
			this.setState({ hasVoted: true })
		}
	}

	setChoice(e) {
		e.stopPropagation()
		this.setState({ choice: e.target.value })
	}

	toggleResultsView(e) {
		e.stopPropagation()
		this.setState({ pollResultsView: !this.state.pollResultsView})
	}

	showDelete() {
		const { deletePoll , data } = this.props
		if(this.state.isAuthor) {
		return (
		<Button bsStyle='danger' type='submit' onClick={() => deletePoll(data)}>
		<i className='fa fa-minus-circle' aria-hidden='true'></i>
		</Button>
		)
		} else {
			return (
				<noscript/>
			)
		}
	}

	pollView() {
		const poll = this.props.data
		if(!this.state.pollResultsView) {
			return poll.poll_options.map((option) => {
				return (
				<div key={option.optionId}>
		        	<input
		        	type='radio'
		        	name='options' 
		        	value={option.optionId}
		        	onClick={this.setChoice} />
		        	{option.text}
				</div>
		    	)
			})
		} else {
			let data = poll.poll_options.map(option => [option.text, parseInt(option.voteCount)])
			return (
					<div>
					<h4>{poll.question}</h4>
						<Chart chartType="BarChart" 
						data={[['Choice', 'Vote Count'], ...data]} 
						options={{}} graph_id="BarChart"  
						width={'90%'} height={'150px'}  
						legend_toggle={true} />
					</div>
					)
		}
	}

	voteOnPoll(e) {
		e.preventDefault()
		e.stopPropagation()
		this.setState({ hasVoted: true })
		const { vote } = this.props
		vote(this.state.choice)
	}

	handleCollapsible() {
		this.setState({ open: !this.state.open })
	}

	render() {
		const poll = this.props.data
		const hasVoted = this.state.hasVoted
		return (
		<Panel
      	bsStyle='primary'
        header={poll.question}
        collapsible
        expanded={this.state.open}
        onClick={this.handleCollapsible}>
        {this.pollView()}
         <Button bsStyle='success' type='submit' onClick={!hasVoted ? this.voteOnPoll : null} disabled={hasVoted}>
		{hasVoted ? 'Thanks!': 'Submit'} <i className='fa fa-check-circle' aria-hidden='true'></i>
		</Button>
		<Button bsStyle='info' type='submit' onClick={this.toggleResultsView}>
			See Results
		</Button>
		{this.showDelete()}
      </Panel>
		)
	}
}

function mapStateToProps({votes}) {
	return {votes}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({deletePoll, vote, getVotes}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Poll)
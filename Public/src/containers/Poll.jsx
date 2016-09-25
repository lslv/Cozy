import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { Button, Panel, Radio } from 'react-bootstrap'
import { connect } from 'react-redux'
import { deletePoll } from '../actions/actions_polls'

import { addPoll } from '../actions/actions_polls'

class Poll extends Component {
	constructor(props) {
		super(props)

		this.state = {
			open: false
		}
		this.handleCollapsible = this.handleCollapsible.bind(this)
	}

	handleCollapsible() {
		this.setState({ open: !this.state.open })
	}

	render() {

		const poll = this.props.data

		return (
			<Panel
      	bsStyle='primary'
        header={poll.question}
        collapsible
        expanded={this.state.open}
        onClick={this.handleCollapsible}>
        {poll.poll_options.map((option) => {
	return (
        	<Radio key={option.optionId}>
        	{option.text}
        	</Radio>
        	)
})}
        <Button bsStyle='success'>
          Submit <i className='fa fa-check-circle' aria-hidden='true'></i>
        </Button>
      </Panel>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({deletePoll}, dispatch)
}

export default connect(null, mapDispatchToProps)(Poll)
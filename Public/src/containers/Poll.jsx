import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { Button, Panel } from 'react-bootstrap'
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
		return (
			<Panel
      	bsStyle='primary'
        header='test poll'
        collapsible
        expanded={this.state.open}
        onClick={this.handleCollapsible}>
        <p>Test</p>
      </Panel>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({deletePoll}, dispatch)
}

export default connect(null, mapDispatchToProps)(Poll)
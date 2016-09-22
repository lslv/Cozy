import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteChore} from '../actions/index'
import {bindActionCreator} from 'redux'
import {Button, Panel} from 'react-bootstrap';

class Chore extends Component {
	constructor(props){
		super(props)
		this.state={
			open:false
		}
	}

	deleteChore(choreId){
		this.props.deleteChore(choreId)
	}

	render(){
		const {chore}= this.props
		return (
				<Panel
				header={chore.title}
				collapsible
				expanded={this.state.open}
				onClick={()=>this.setState({open: !this.state.open})}>
					<h3>{chore.title}</h3>
					<h6>{chore.time}</h6>
					<Button bsStyle="danger"
					onClick={()=> this.deleteChore(chore.id)}>
					Delete Chore</Button>
				</Panel>
			)
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreator({deleteChore}, dispatch)
}

export default connect(null,{deleteChore})(Chore)
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteChore, updateChoreTurn } from '../actions/actions_chores'
import { getQueue } from '../actions/actions_queues'
import {bindActionCreators} from 'redux'
import {Button, Panel} from 'react-bootstrap'
import Queue from './Queue'
import $ from 'jquery'

class Chore extends Component {
	constructor(props){
		super(props)
		this.state={
			open:false,
			onceForceUpdate:_.once(this.forceUpdate.bind(this))
		}
		this.clickHandler=this.clickHandler.bind(this)
	}

	componentWillMount(){
		this.props.getQueue(this.props.chore.id) //refactor this code so that it grabs all chores associated with a house
	}


	deleteChore(choreId){
		this.props.deleteChore(choreId)
	}

	renderQueue(){
		const {queues} = this.props
		const {chore} = this.props
		const {users}= this.props
		if(Object.keys(queues).length && queues[this.props.chore.id]){
			var choreQueue= queues[this.props.chore.id]
			var queueInOrder=[ ...choreQueue.slice(chore.user_turn), ...choreQueue.slice(0, chore.user_turn) ]
			return queueInOrder.map((queuePosition,index)=>{		
				if(index< queues[this.props.chore.id].length-1)
					return (
						<span key={queuePosition.id}>
						{ `${users[queuePosition.userId].user_name}\'s` } Turn {'<'}-  
						</span>
						)
				else
					return (
						<span key={queuePosition.id}>
						{ `${users[queuePosition.userId].user_name}\'s` } Turn 
						</span>
						)
			})
		}
	}
	renderQueueNetwork(){
		const {queues} = this.props
		const {chore} = this.props
		const {users}= this.props
		if(Object.keys(queues).length && queues[this.props.chore.id]){
			return <Queue onClick={event => event.stopPropagation() } chore={chore} queues={queues} users={users} open={this.state.open} onceForceUpdate={this.state.onceForceUpdate}/>
		}
	}

	handleUnverify(event){
		event.stopPropagation()
		this.props.updateChoreTurn(this.props.chore.id)
	}

	clickHandler(){
		if(this.state.open){
			this.setState({onceForceUpdate:_.once(this.forceUpdate.bind(this))})
		}
		this.setState({open: !this.state.open})
	}

	render(){
		const {chore}= this.props
		return (
				<Panel
				header={chore.chore_name}
				collapsible
				expanded={this.state.open}
				onClick={this.clickHandler}
				>
					<h3>{chore.chore_name}</h3>
					<h6>{chore.day}</h6>
					{this.renderQueue()}
					<br/>
					{this.renderQueueNetwork()}
					<br/>
					<Button
					bsStyle="danger"
					onClick={()=> this.deleteChore(chore.id)}>
					Delete Chore
					</Button>
					<Button
					bsStyle="info"
					onClick={(event) => this.handleUnverify(event)}>
					Un-Verify Chore (Assigned User Did Not Complete Chore)
					</Button>
				</Panel>
			)
	}
}

function mapStateToProps(state){
	return {queues:state.queues, users:state.users}
}


function mapDispatchToProps(dispatch){
	return bindActionCreators({deleteChore, getQueue, updateChoreTurn}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Chore)
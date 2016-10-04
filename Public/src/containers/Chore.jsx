import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteChore, updateChoreTurn } from '../actions/actions_chores'
import { getQueue } from '../actions/actions_queues'
import {bindActionCreators} from 'redux'
import {Button, Panel} from 'react-bootstrap'
import Queue from './Queue'
import moment from 'moment'

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
		this.props.getQueue(this.props.chore.id)
		.then(()=>{
			const {queues} = this.props
			const {users} = this.props
			const {chore} = this.props
			if(this.props.chore.new){
				var choreQueue= queues[chore.id]
				var queueInOrder=[ ...choreQueue.slice(chore.user_turn), ...choreQueue.slice(0, chore.user_turn) ]
				var events = queueInOrder.map((queuePosition,index)=>{
				var choreDate=new Date(moment().day(chore.day))
				var verifyCount=0
				choreDate.setDate(choreDate.getDate()+(7*index)+verifyCount)
				choreDate=(String(choreDate.getFullYear())+'-'+String(choreDate.getMonth()+1)+'-'+String(choreDate.getDate()))
				return   {	'end':{
								'date':choreDate
								},
								'start':{
									'date':choreDate
								},
								'description': 'This is a chore for '+users[queuePosition.userId].user_name, 
								'summary': chore.chore_name+'-'+users[queuePosition.userId].user_name,
							}
					})
			console.log(events)
			var batchChoreEvents = gapi.client.newBatch()
			events.forEach((chore)=>{
			//insert attendees field as other users
			console.log(chore)
			let request = gapi.client.calendar.events.insert({
				'calendarId': this.props.calendar,
				'resource':  chore})
			batchChoreEvents.add(request)
			})
			batchChoreEvents.then((results)=>{
				console.log(results)
			})
				}
		})
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
					Un-Verify Chore (Assigned User Did Not Complete Chore, should only be for admin)
					</Button>
				</Panel>
			)
	}
}

function mapStateToProps(state){
	return {queues:state.queues, users:state.users, calendar:state.calendar}
}


function mapDispatchToProps(dispatch){
	return bindActionCreators({deleteChore, getQueue, updateChoreTurn}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Chore)
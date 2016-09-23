import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteChore, getQueue, updateChoreTurn, updateQueue} from '../actions/index'
import {bindActionCreators} from 'redux'
import {Button, Panel} from 'react-bootstrap';

class Chore extends Component {
	constructor(props){
		super(props)
		this.state={
			open:false
		}
	}

	componentWillMount(){
		this.props.getQueue(this.props.chore.id)
	}


	deleteChore(choreId){
		this.props.deleteChore(choreId)
	}

	renderQueue(){
		const {queues} = this.props
		const {chore} = this.props
		if(Object.keys(queues).length && queues[this.props.chore.id]){
			var choreQueue= queues[this.props.chore.id]
			var queueInOrder=[ ...choreQueue.slice(chore.user_turn), ...choreQueue.slice(0, chore.user_turn) ]
			return queueInOrder.map((queuePosition,index)=>{		
				if(index< queues[this.props.chore.id].length-1)
					return (
						<span key={queuePosition.id}>
						User {queuePosition.userId}s Turn ->  
						</span>
						)
				else
					return (
						<span key={queuePosition.id}>
						User {queuePosition.userId}s Turn 
						</span>
						)
			})
		}
	}

	handleVerify(event){
		event.stopPropagation()
		//need to both change the order in the state, and the user turn of the chore and handle outputing the new user chore queue based off of the turn
		this.props.updateChoreTurn(this.props.chore.id)
		//this.props.updateQueue(this.props.chore.id)
	}

	render(){
		const {chore}= this.props
		return (
				<Panel
				header={chore.chore_name}
				collapsible
				expanded={this.state.open}
				onClick={()=>this.setState({open: !this.state.open})}>
					<h3>{chore.chore_name}</h3>
					<h6>{chore.day}</h6>
					{this.renderQueue()}
					<br/>
					<Button
					bsStyle="danger"
					onClick={()=> this.deleteChore(chore.id)}>
					Delete Chore
					</Button>
					<Button
					bsStyle="info"
					onClick={(event) => this.handleVerify(event)}>
					Verify Chore
					</Button>
				</Panel>
			)
	}
}
function mapStateToProps(state){
	return {queues:state.queues}
}


function mapDispatchToProps(dispatch){
	return bindActionCreators({deleteChore, getQueue, updateChoreTurn, updateQueue}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Chore)
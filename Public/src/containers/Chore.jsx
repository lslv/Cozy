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
	renderQueue(){
		// console.log(this.props.queue)
		if(this.props.queue)
		return this.props.queue.map((queuePosition,index)=>{
			if(index < this.props.queue.length-1)
			{return (
							<span key={queuePosition.id}>
							User {queuePosition.userId}s Turn ->
							</span>
							)}
			else{
				return (
							<span key={queuePosition.id}>
							User {queuePosition.userId}s Turn
							</span>
							)
			}
		})
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
					Delete Chore</Button>
				</Panel>
			)
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreator({deleteChore}, dispatch)
}

export default connect(null,{deleteChore})(Chore)
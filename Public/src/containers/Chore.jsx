import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteChore, getQueue} from '../actions/index'
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
		const {queues}=this.props
		if(Object.keys(queues).length && queues[this.props.chore.id])
			return queues[this.props.chore.id].map((queuePosition,index)=>{		
				return (
						<span key={queuePosition.id}>
						User {queuePosition.userId}s Turn ->  
						</span>
						)
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
function mapStateToProps(state){
	return {queues:state.queues}
}


function mapDispatchToProps(dispatch){
	return bindActionCreators({deleteChore, getQueue}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Chore)
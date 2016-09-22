import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getChores, getQueue} from '../actions/index'
import {bindActionCreator} from 'redux'
import AddChore from './AddChore'
import Chore from './Chore'
import {Accordion, Panel, Button, Collapse, Well} from 'react-bootstrap';

class ChoreList extends Component {
	constructor(props){
		super(props)
		this.state={
			open:true
		}
	}
	componentWillMount(){
		this.props.getChores() //eventually need to pass in house ID from local storage
		.then(()=>{
			this.props.chores.forEach((chore)=>{
				this.props.getQueue(chore.id)
				console.log(chore)
			})
		})
		
	}
	renderChoreList(){
		return this.props.chores.map( chore => {
			return <Chore key={chore.chore_name} chore={chore} />
		}	)
	}
	render(){
		console.log("in chorelist render")
		console.log(this.props.queues)
		return (
			<div>
				<Accordion>
					<Panel>
						<AddChore />
					</Panel>
					{this.renderChoreList()}
				</Accordion>
			</div>
			)
	}
}

function mapStateToProps(state){
	return {chores:state.chores, queues:state.queues} //add state infusion there
}

function mapDispatchToProps(dispatch){
	return bindActionCreator({getChores, getQueue}, dispatch)
}

export default connect(mapStateToProps, {getChores, getQueue})(ChoreList)

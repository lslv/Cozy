import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getChores} from '../actions/index'
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
		//console.log("Should Grab Dynamic Chores Data from backend before component mounts")
	}
	renderChoreList(){
		console.log("rendering chore List")
		console.log("chore list ",this.props.chores)
		return this.props.chores.map((chore)=>{
			return (
					<Chore key={chore.title} chore={chore} />		
				)
		})
	}
	render(){
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
	return {chores:state.chores} //add state infusion there
}

function mapDispatchToProps(dispatch){
	return bindActionCreator({getChores}, dispatch)
}

export default connect(mapStateToProps, {getChores})(ChoreList)

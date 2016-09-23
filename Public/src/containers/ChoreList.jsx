import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getChores, getQueue} from '../actions/index'
import {bindActionCreators} from 'redux'
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
				// console.log(chore)
			})
		})
		
	}
	renderChoreList(){
		// console.log(this.props.queues)
		if(Object.keys(this.props.queues).length){
			// console.log('we out here')
			return this.props.chores.map( chore => {
				// console.log("inside render ChoreList")
				// console.log(this.props.queues)
				// console.log(Object.keys(this.props.queues))
				// for(var key in this.props.queues){
				// 	console.log('key ',key )
				// 	console.log('this.props.queue ', this.props.queues[key] )

				// }
				// console.log("after render ChoreList")
				return <Chore key={chore.chore_name} chore={chore} queue={this.props.queues[chore.id]} />
			}	)
		}
	}
	render(){
		// console.log("in chorelist render")
		// console.log(this.props.queues)
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
	//console.log(state)
	return {chores:state.chores, queues:state.queues} //add state infusion there
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({getChores, getQueue}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoreList)

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getChores} from '../actions/index'
import {bindActionCreator} from 'redux'
import AddChore from './AddChore'

class ChoreList extends Component {
	componentWillMount(){
		//console.log("Should Grab Dynamic Chores Data from backend before component mounts")
	}
	renderChoreList(){
		console.log("rendering chore List")
		console.log("chore list ",this.props.chores)
		return this.props.chores.map((chore)=>{
			return (
				<ul key={chore.title}>
					<li>{chore.title}</li>
					<li>{chore.time}</li>
				</ul>
				)
		})
	}

	render(){
		return (
			<div>
			<AddChore />
			<div>
			</div>
			{this.renderChoreList()}
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

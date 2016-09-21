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
				<li key={chore}>{chore}</li>
				)
		})
	}

	render(){
		return (
			<div>
			<AddChore />
			<div>
			</div>
			<ul>
			{this.renderChoreList()}
			</ul>
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

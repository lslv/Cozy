import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addChore} from '../actions/index'
import {bindActionCreators} from 'redux'

class AddChore extends Component {
	constructor(props){
		super(props)
		this.state={
			title:''
		}
	}
	handleSubmit(){
		console.log('handling Submit')
		this.props.addChore(this.state.title)
	}

	onInputChange(event){
		this.setState({title:event.target.value})
	}

	render(){
		return(
			<div>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<h3>Create a new chore</h3>
						<label>Title</label>
						<input type="text" value={this.state.title} onChange={this.onInputChange.bind(this)} className="form-control"/>
					<button type="submit" className="btn btn-primary">Submit</button>
				</form>

			</div>
			)
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({addChore}, dispatch)
}

export default connect(null, mapDispatchToProps)(AddChore)
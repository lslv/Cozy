import React, {Component} from 'react';
import {addChore} from '../actions/index';

export default class AddChore extends Component {

	handleSubmit(){
		console.log('handling Submit');
	}

	render(){
		return(
			<div>
				<form onSubmit={()=>this.handleSubmit()}>
					<h3>Create a new chore</h3>
					<div className="form-group">
						<label>Title</label>
						<input type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Time</label>
						<input type="text" className="form-control"/>
					</div>
					<button type="submit" className="btn btn-primary">Submit</button>
				</form>

			</div>
			);
	}
}
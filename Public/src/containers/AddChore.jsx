import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addChore} from '../actions/index'
import {bindActionCreators} from 'redux'
import { Button, Collapse, Well } from 'react-bootstrap'

class AddChore extends Component {
	constructor(props){
		super(props)
		this.state={
			title:''
		}
		this.handleSubmit=this.handleSubmit.bind(this);
	}
	handleSubmit(event){
		event.preventDefault();
		console.log('handling Submit')
		this.props.addChore(this.state.title)
		this.setState({ open: !this.state.open })
		this.setState({ title:''});
	}

	onInputChange(event){
		this.setState({title:event.target.value})
	}

	// render(){
	// 	return(
	// 		<div>
	// 			<form onSubmit={(event)=>this.handleSubmit(event)}>
	// 				<h3>Create a new chore</h3>
	// 					<label>Title</label>
	// 					<input type="text" value={this.state.title} onChange={this.onInputChange.bind(this)} className="form-control"/>
	// 				<button type="submit" className="btn btn-primary">Submit</button>
	// 			</form>

	// 		</div>
	// 		)
	// }
render() {
    return (
      <div>
        <Button onClick={ ()=> this.setState({ open: !this.state.open })}>
          Add Chore <i className='fa fa-plus-circle' aria-hidden='true'></i>
        </Button>
        <Collapse in={this.state.open}>
          <div>
            <Well>
            	<div>
				<form onSubmit={(event)=>this.handleSubmit(event)}>
					<h3>Create a new chore</h3>
						<label>Title</label>
						<input type="text" value={this.state.title} onChange={this.onInputChange.bind(this)} className="form-control"/>
					<button type="submit" className="btn btn-primary">Submit</button>
				</form>

			</div>
            </Well>
          </div>
        </Collapse>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({addChore}, dispatch)
}

export default connect(null, mapDispatchToProps)(AddChore)
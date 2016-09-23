import React, {Component} from 'react'
import {addChore} from '../actions/index'
import { Button, Collapse, Well } from 'react-bootstrap'
import {reduxForm} from 'redux-form'

class AddChore extends Component {
	constructor(props){
		super(props)
		this.state={
		}
	}
	handleSubmit(event){
		event.preventDefault();
		console.log('handling Submit')
		this.props.addChore(this.state.chore_name)
		this.setState({ open: !this.state.open })
	}
render() {
	const { fields:{chore_name, day}, handleSubmit}= this.props
    return (
      <div>
        <Button bsStyle="primary" onClick={ ()=> this.setState({ open: !this.state.open })}>
          Add Chore <i className='fa fa-plus-circle' aria-hidden='true'></i>
        </Button>
        <Collapse in={this.state.open}>
          <div>
            	<div>
					<form onSubmit={handleSubmit(this.props.addChore)}>
						<h3>Create a new chore</h3>
						<div>
							<label>Chore Name</label>
							<input type="text" className="form-control" {...chore_name} />
							</div>
						<div>
							<label>Reocurring Day</label>
							<input type="text" className="form-control" {...day}/>
						</div>
						<Button
						onClick={ ()=> this.setState({ open: !this.state.open })}
						type="submit"
						className="btn btn-primary"
						bsStyle="success"
						>
						Submit
						</Button>
					</form>
				</div>
          </div>
        </Collapse>
      </div>
    )
  }
}
export default reduxForm({
		form: 'AddChore',
		fields:['chore_name', 'day']},null,{addChore})(AddChore)









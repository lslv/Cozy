import React, {Component} from 'react'
import {addChore} from '../actions/actions_chores'
import { Button, Collapse, Well, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import {reduxForm} from 'redux-form'
import {bindActionCreators} from 'redux'

class AddChore extends Component {
	constructor(props){
		super(props)
		this.state={
			selectValue:'Sunday'
		}
		this.checkIfValidSubmit=this.checkIfValidSubmit.bind(this)
	}

	checkIfValidSubmit(event){
		const {handleSubmit, addChore, resetForm} = this.props
		event.preventDefault()
		if(handleSubmit(addChore)(event)){
			this.setState({ open: !this.state.open })
			resetForm()
		}
	}



	render() {
		const { fields:{type, chore_name, day}, handleSubmit } = this.props
		return (
      <div>
        <Button bsStyle="primary" onClick={ ()=> this.setState({ open: !this.state.open })}
        bsSize="large" block>
          Add Chore <i className='fa fa-plus-circle' aria-hidden='true'></i>
        </Button>
        <Collapse in={this.state.open}>
          <div>
            	<div>
					<form onSubmit={this.checkIfValidSubmit }>
						<h3>Create a new chore</h3>
						<div className={`form-group ${type.touched && type.error ? 'has-error' : ''}`}>
							<label>Choose Type Of Chore</label>
							<select className="form-control"
							{...type}>
								<option value="">----</option>
								<option value="group">group</option>
								<option value="personal">personal</option>
							</select>
						</div>
						<div className={`form-group ${chore_name.touched && chore_name.error ? 'has-error' : ''}`}>
							<label>Input Chore Name</label>
							<input type="text" className="form-control" {...chore_name} />
							</div>
						<div className={`form-group ${day.touched && day.error ? 'has-error' : ''}`}>
							<label>Choose Reocurring Day</label>
							<select className="form-control" {...day}>
								<option value="">----</option>
								<option value="sunday">sunday</option>
								<option value="monday">monday</option>
								<option value="tuesday">tuesday</option>
								<option value="wednesday">wednesday</option>
								<option value="thursday">thursday</option>
								<option value="friday">friday</option>
								<option value="saturday">saturday</option>
							</select>
						</div>
						<Button
						
						type="submit"
						className="btn btn-primary"
						bsStyle="success">
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

function validate(formElements){
	const errors={}
	if(formElements.type === undefined || formElements.type === '----' ||
		formElements.type === '' ){
		errors.type = 'Must Select A Valid Type'
	}
	if(formElements.chore_name === undefined || formElements.chore_name=== ''){
		errors.chore_name='Must Input A Chore Name'
	}
	if(formElements.day === undefined || formElements.day === '----' ||
		formElements.day === '' ){
		errors.day = 'Must Select A Valid Day'
	}
	return errors
}

function mapStateToProps(state){
	return {chores:state.chores, queues:state.queues, users:state.users, calendar:state.calendar}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({addChore}, dispatch)
}

export default reduxForm({
	form: 'AddChore',
	fields:['type','chore_name', 'day'],
	validate},mapStateToProps,mapDispatchToProps)(AddChore)

//form group for multiple day selection->will be used later
// <FormGroup controlId="formControlsSelectMultiple">
//   <ControlLabel>Select Recoccuring Days</ControlLabel>
//   <FormControl componentClass="select" multiple {...day}>
// 	<option value="sunday">sunday</option>
// 	<option value="monday">monday</option>
// 	<option value="tuesday">tuesday</option>
// 	<option value="wednesday">wednesday</option>
// 	<option value="thursday">thursday</option>
// 	<option value="friday">friday</option>
// 	<option value="saturday">saturday</option>
//   </FormControl>
// </FormGroup>









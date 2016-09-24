import React, {Component} from 'react'
import {addChore} from '../actions/index'
import { Button, Collapse, Well, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import {reduxForm} from 'redux-form'

class AddChore extends Component {
	constructor(props){
		super(props)
		this.state={
		}
	}

	render() {
		const { fields:{chore_name, day}, handleSubmit } = this.props
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
							<select className="form-control" {...day}>
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
						onClick={ ()=> this.setState({ open: !this.state.open })}
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
export default reduxForm({
	form: 'AddChore',
	fields:['chore_name', 'day']},null,{addChore})(AddChore)

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









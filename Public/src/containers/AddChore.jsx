import React, {Component} from 'react'
// import {connect} from 'react-redux'
import {addChore} from '../actions/index'
// import {bindActionCreators} from 'redux'
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
		this.props.addChore(this.state.title)
		this.setState({ open: !this.state.open })
	}
render() {
	const { fields:{title, time}, handleSubmit}= this.props
    return (
      <div>
        <Button onClick={ ()=> this.setState({ open: !this.state.open })}>
          Add Chore <i className='fa fa-plus-circle' aria-hidden='true'></i>
        </Button>
        <Collapse in={this.state.open}>
          <div>
            <Well>
            	<div>

				<form onSubmit={handleSubmit(this.props.addChore)}>
					<h3>Create a new chore</h3>

					<div>
					<label>Title</label>
					<input type="text" className="form-control" {...title} />
					</div>

					<div>
					<label>Reocurring Time</label>
					<input type="text" className="form-control" {...time}/>
					</div>

					<button onClick={ ()=> this.setState({ open: !this.state.open })} type="submit" className="btn btn-primary">Submit</button>
				</form>

			</div>
            </Well>
          </div>
        </Collapse>
      </div>
    )
  }
}


export default reduxForm({
		form: 'AddChore',
		fields:['title', 'time']},null,{addChore})(AddChore)









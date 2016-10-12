import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { reduxForm } from 'redux-form'

import PureInput from '../components/PureInput'
import { addPoll, getPolls } from '../actions/actions_polls'

const fields = ['question', 'options[].option']

class AddPoll extends Component {
	constructor (props) {
		super(props)

		this.submitForm = this.submitForm.bind(this)
	}

	submitForm(e) {
		e.preventDefault()
		const { handleSubmit, destroyForm, resetForm, getPolls } = this.props
		let result = handleSubmit(this.props.addPoll)
		result(e)
    	.then(() => getPolls())
		resetForm()
	}

	render () {
		const { fields: { question, options }, errors, submitting} = this.props
		return (
	  <div className='addItem-container'>
      <form onSubmit={this.submitForm}>
        <div className={`form-group ${question.touched && question.error ? 'has-error' : ''}`}>
          <label>
            Ask a question:
          </label>
          <PureInput type='text' className='form-control' placeholder='Whats your question?' field={question} title={question.error} />
          <p>{errors.question}</p>
        </div>
        <div className='bulletin-button-container'>
          <Button bsStyle='primary' onClick={() => options.addField()}>
            Add option <i className='fa fa-plus-circle' aria-hidden='true'></i>
          </Button>
          <Button bsStyle='success' type='submit' disabled={submitting}>
           Make poll
          </Button>
        </div>
        {options.map((option, i) => {
			return (
            <div className='form-group' key={i}>
              <label>Option { i + 1}</label>
                <PureInput type='text' className='form-control' placeholder={i + 1} field={option.option} />
            </div>
          )
		})}
      </form>
      </div>
    )
	}
}

const validate = (formElements) => {
	const errors = {}

	if(!formElements.question) {
		errors.question = 'Must ask a question'
	}
  //Not working yet
	// if(!formElements.options.option) {
	// 	errors.option = 'Must include an option'
	// }
	return errors
}

export default reduxForm({
	form: 'deep',
	fields,
	validate}, undefined, { addPoll: addPoll, getPolls: getPolls })(AddPoll)

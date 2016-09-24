import React, { Component } from 'react'
import { Button, Collapse, Well } from 'react-bootstrap'
import { reduxForm } from 'redux-form'

import PollFormOption from '../components/PollFormOption'

export default class AddPoll extends Component {
	constructor (props) {
		super(props)

		this.state = { counter: 1 }

		this.addOption = this.addOption.bind(this)
		this.renderNewOption = this.renderNewOption.bind(this)
	}


	addOption () {
		this.state[`Option ${this.state.counter}`] = ''
    this.setState({ counter: this.state.counter+=1})
		console.log('this.state', this.state)
		// this.renderNewOption()
	}

	renderNewOption () {
		// return this.state.iterator.map((option, i) => {
		// 	i+=1
		// 	return (
  //       <PollFormOption key={i} optionNumber={i}/>
  //     )
		// })
	}

	render () {
		return (
      <form>
        <div className='form-group'>
          <label>
            Ask a question:
          </label>
          <input type='text' className='form-control' placeholder='Whats your question?' />
        </div>
        <div className='form-group'>
          <Button bsStyle='primary' onClick={this.addOption}>
            Add option: <i className='fa fa-plus-circle' aria-hidden='true'></i>
          </Button>
        </div>
        {/*this.renderNewOption()*/}
        {Object.keys(this.state).map((field) => {
          if(field !== 'counter') {
            <label key={field}>
              <input type='text' value={this.state[field]} onChange={event => this.setState({ [field]: event.target.value })} /> 
          }
        })}
      </form>
    )
	}
}

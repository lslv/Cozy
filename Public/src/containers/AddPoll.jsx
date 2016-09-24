import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { reduxForm } from 'redux-form'

import PollFormOption from '../components/PollFormOption'

export default class AddPoll extends Component {
	constructor (props) {
		super(props)

		this.state = { counter: 1 }

		this.addOption = this.addOption.bind(this)
	}


	addOption () {
    
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
          <Button bsStyle='success' onClick={this.addOption}>
            Make poll
          </Button>
        </div>
      </form>
    )
	}
}

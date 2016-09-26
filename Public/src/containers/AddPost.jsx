import React, { Component } from 'react'
import { ButtonGroup, Button, FormGroup, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux'
import { addPost } from '../actions/actions_posts'
import { bindActionCreators } from 'redux'

class AddPost extends Component {
	constructor (props) {
		super(props)

		this.state = { title: '', message: ''}

		this.onMsgInputChange = this.onMsgInputChange.bind(this)
		this.onTitleInputChange = this.onTitleInputChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.titleValidation = this.titleValidation.bind(this)
    this.messageValidation = this.messageValidation.bind(this)
	}

	titleValidation() {
		const titleLength = this.state.title.length
		if(titleLength < 2) return 'error'
		return 'success'
	}

	messageValidation() {
		const messageLength = this.state.message.length
		if(messageLength < 2) return 'error'
		return 'success'
	}

	onMsgInputChange (event) {
		this.setState({ message: event.target.value })
	}

	onTitleInputChange (event) {
		this.setState({ title: event.target.value })
	}

	handleSubmit (e) {
		e.preventDefault()
		this.props.addPost(this.state)
		this.setState({ message: '', title: ''})
	}

	render () {
		if (this.state.flag) {
			return <noscript />
		}
		return (
      <form onSubmit={this.handleSubmit}>
      <FormGroup validationState={this.titleValidation()}>
        <FormControl placeholder='Add title' 
          value={this.state.title} 
          onChange={this.onTitleInputChange}
          className='form-control' 
          data-error='Please add a title'
          required/>
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup validationState={this.messageValidation()}>
          <FormControl placeholder='Add a post-it message' 
            value={this.state.message} 
            onChange={this.onMsgInputChange} 
            className='form-control'
            required/>
          <FormControl.Feedback />
        </FormGroup>
        <div className='form-group'>
          <ButtonGroup>
            <Button type='submit' bsStyle='info'>
              Leave a message
            </Button>
          </ButtonGroup>
        </div>
        </form>
    )
	}
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({addPost}, dispatch)
}

export default connect(null, mapDispatchToProps)(AddPost)

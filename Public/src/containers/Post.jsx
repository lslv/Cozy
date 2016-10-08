import React, { Component } from 'react'
import { Button, Panel, FormGroup, FormControl } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { deletePost, editPost } from '../actions/actions_posts'

class Post extends Component {
	constructor (props) {
		super(props)
		this.state = {
			open: false,
			editMode: false,
			editMessageValue: '',
			isAuthor: false
		}

		this.handleDelete = this.handleDelete.bind(this)
		this.handleCollapsible = this.handleCollapsible.bind(this)
		this.showMessageEdit = this.showMessageEdit.bind(this)
		this.handleMessageEdit = this.handleMessageEdit.bind(this)
		this.toggleMessageEdit = this.toggleMessageEdit.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.editValidation = this.editValidation.bind(this)
		this.showAuthoringTools = this.showAuthoringTools.bind(this)
		this.stopProp = this.stopProp.bind(this)
	}

	componentWillMount() {
		const post = this.props.data
		const user_id = sessionStorage.getItem('id')
		if(user_id == post.user_id) {
			this.setState({ isAuthor: true })
		}
	}

	handleDelete () {
		this.props.deletePost(this.props.data)
	}

	editValidation() {
		const editLength = this.state.editMessageValue.length
		if(editLength < 2) return 'error'
		return 'success'
	}

	stopProp (e) {
    // Stops propogation to parent panel's click event when focus goes to input
		e.stopPropagation()
	}

	handleInputChange (e) {
		this.setState({ editMessageValue: e.target.value })
	}

	handleMessageEdit (e) {
		e.stopPropagation()
		this.props.editPost(this.props.data, this.state.editMessageValue)
		this.setState({ editMode: !this.state.editMode })
	}

	showMessageEdit () {
		const post = this.props.data
		if (!this.state.editMode) {
			return (
        <h3>{post.message}</h3>
      )
		} else {
			return (
        <div>
        <FormGroup
        validationState={this.editValidation()}>
        <div className='col-xs-4'>
          <FormControl
          	bsClass='form-control'
            value={this.state.editMessageValue}
            onClick={this.stopProp}
            onChange={this.handleInputChange}
            placeholder={post.message} />
        </div>
          <Button bsStyle='success' onClick={this.handleMessageEdit}>
            <i className='fa fa-check-circle' aria-hidden='true'></i>
          </Button>
         </FormGroup>
        </div>
      )
		}
	}

	showAuthoringTools() {

		if(this.state.isAuthor) {
			return (
				<div className='bulletin-item-button-container'>
				 <Button bsStyle='danger' onClick={this.handleDelete}>
          			<i className='fa fa-minus-circle' aria-hidden='true'></i>
        		 </Button>
        		 <Button bsStyle='warning' onClick={this.toggleMessageEdit}>
          			<i className='fa fa-pencil' aria-hidden='true'></i>
        		 </Button>
				</div>
			)
		} else {
			return (
				<noscript/>
			)
		}

	}

	toggleMessageEdit (e) {
    // stop propogation prevents the event from propogating to parent element and calling the parent event (in this case: panel onClick)
		e.stopPropagation()
		this.setState({ editMode: !this.state.editMode })
	}

	handleCollapsible () {
		this.setState({ open: !this.state.open })
	}

	render () {
		const post = this.props.data
		return (
      <Panel
      	bsStyle='info'
        header={post.title}
        collapsible
        expanded={this.state.open}
        onClick={this.handleCollapsible}>
        {this.showMessageEdit()}
       	{this.showAuthoringTools()}
      </Panel>
    )
	}
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({deletePost, editPost}, dispatch)
}

export default connect(null, mapDispatchToProps)(Post)

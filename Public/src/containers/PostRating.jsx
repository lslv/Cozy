import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { postRating } from '../actions/actions_ratings'
import { bindActionCreators } from 'redux'
import {reduxForm} from 'redux-form'

class PostRating extends Component {
	//beginning of constructor
	constructor(props) {
		super(props)

		this.state = {
			star:'',
			rating:'',
			review_on:'',
			reviewed_by: sessionStorage.getItem('username') //need a copy of searched user's id
		}
		this.inputStar = this.inputStar.bind(this);
		this.inputRating = this.inputRating.bind(this);
		this.submitRating = this.submitRating.bind(this);
	} //end of constructor


	inputStar(event){
		this.setState({star: event.target.value})
	}

	inputRating(event){
		this.setState({rating: event.target.value})
	}

	submitRating(e) {
		e.preventDefault()

		this.props.postRating({
			star: this.state.star,
			rating: this.state.rating,
			review_on: sessionStorage.getItem('review_on'),
			reviewed_by: this.state.reviewed_by
		})
	}

	render () {
		return (
			<form onSubmit={this.submitRating} className="RatingForm">
        <input type="text" value={this.state.star} onChange={this.inputStar} placeholder="Stars out of 5"/>
        <input type="text" value={this.state.rating} onChange={this.inputRating} placeholder="Write a Rating"/>
        <input type="submit" value="Post" />
      </form>
    )
	}
}

function mapDispatchToProps(dispatch) {
	return (
		{
			postRating: (x)=>dispatch(postRating(x))
		}
	)
}

export default connect(null, mapDispatchToProps)(PostRating)

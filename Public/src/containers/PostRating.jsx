import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import {fetchAllRatings} from '../actions/actions_ratings'
import {reduxForm} from 'redux-form'

export default class PostRating extends Component {
	//beginning of constructor
	constructor(props){
		super(props)

		this.state = {
			star:'',
			rating:'',
			reviewer: sessionStorage.getItem('id') //can i just grab sessionStorage from anywhere?
			reviewed: sessionStorage.getItem('') //need a copy of searched user's id
		}
		this.submitRating = this.submitRating.bind(this);
	} //end of constructor

submitRating(){
	this.setState({star:'',rating:''})
}

	render () {
		return (
			<form onSubmit={this.submitRating} className="RatingForm">
        <input type="text" placeholder="Stars out of 5" />
        <input type="text" placeholder="Write a Rating" />
        <input type="submit" value="Post" />
      </form>
    )
	}
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({postRating}, dispatch)
}
//where does fetchAllRatings(which is the action)get the information from?
export default connect(fetchAllRatings,mapDispatchToProps)(PostRating)

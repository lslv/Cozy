import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { fetchAllRatings } from '../actions/actions_ratings'

class UserRatingProfile extends Component {

	constructor(props) {
		super(props)
		this.state = {
			username:''
		}
		
		this.SearchUsername = this.SearchUsername.bind(this)
		this.SearchBar = this.SearchBar.bind(this)
	}

	SearchBar(event){
		this.setState({username: event.target.value})
	}

	SearchUsername(e){
		e.preventDefault();
		this.props.fetchAllRatings(this.state.username)
	}

	render () {
		return(
			<div>
				<form onSubmit={this.SearchUsername}>
					<input type="text" value={this.state.username} onChange={this.SearchBar} placeholder="Search UserName Here"/>
					<input type="submit" value="Search"/>
				</form>

	      <div className="UserOverview"><h5>HIPSTER</h5></div>
	      <div className="UserOverview"><p>LOREM</p></div>
	      <div className="UserOverview"><p>IPSEM</p></div>
	    </div>
		)
	}



}

// function mapStateToProps({}){
// 	return {}
// }

function mapDispatchToProps(dispatch) {
	return (
		{
			fetchAllRatings: (x)=>dispatch(fetchAllRatings(x))
		}
	)
}


export default connect(null, mapDispatchToProps)(UserRatingProfile)
// export default connect(null, {fetchAllRatings})(UserRatingProfile)

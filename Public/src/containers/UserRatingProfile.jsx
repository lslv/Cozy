import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import PostRating from '../containers/PostRating'
import { fetchAllRatings } from '../actions/actions_ratings'
import {Jumbotron} from 'react-bootstrap'

class UserRatingProfile extends Component {

	constructor(props) {
		super(props)
		this.state = {
			username:'',
			search:false
		}

		this.SearchUsername = this.SearchUsername.bind(this)
		this.SearchBar = this.SearchBar.bind(this)
	}

	SearchBar(event){
		this.setState({username: event.target.value})
	}

	SearchUsername(e){
		this.setState({search:true})
		e.preventDefault();
		this.props.fetchAllRatings(this.state.username)
	}
	renderPostRating(){
		if(this.state.search){
			return <PostRating />
		}
		else{
			return <span></span>
		}
	}

	render () {
		return(
			<div>
			<Jumbotron className='UserRatingProfile'>
			<div className='UserRatingTitle'>
						<h1>User Review</h1>
						<h4>Reliability is key to a Cozy home</h4>
						<br></br>
						<div className='searchReviews'>
							<form onSubmit={this.SearchUsername}>
								<input type="text" value={this.state.username} onChange={this.SearchBar} placeholder="Search UserName Here"/>
								<br></br>
								<br></br>
								<input className='findRoomateButton' type="submit" value="Find Roommate"/>
							</form>
						</div>
	    </div>

			</Jumbotron>
			{this.renderPostRating()}
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

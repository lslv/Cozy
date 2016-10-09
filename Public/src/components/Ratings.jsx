import React, { Component } from 'react'
import { Link } from 'react-router'
// import RatingItem from './RatingItem'
import RatingList from '../containers/RatingList'
import PostRating from '../containers/PostRating'
import UserRatingProfile from '../containers/UserRatingProfile'


export default class Ratings extends Component {
	constructor(props){
		super(props)

		this.state = {
			Username: 'bob',
			HouseName:'BroHouse',
			AverageStars:4,
			RatingList: [{stars:3,review:'Narwhal kombucha distillery, retro health goth flannel.'}],
			RatingInput:''
		}
	}
	render () {
		return (
      <div>
				<UserRatingProfile
					Username={this.state.Username}
					AverageStars ={this.state.AverageStars}
					HouseName ={this.state.HouseName}
				/>


				<div className="rating-list">
					<RatingList RatingList={this.state.RatingList} />
					</div>


			</div>
    )
	}
}

import React, { Component } from 'react'
import { Link } from 'react-router'
// import RatingItem from './RatingItem'
import RatingList from './RatingList'
import PostRating from '../containers/PostRating'
import UserRatingProfile from './UserRatingProfile'


export default class Ratings extends Component {
	constructor(props){
		super(props)

		this.state = {
			Username: 'Cheeselover123',
			HouseName:'BroHouse',
			AverageStars:4,
			RatingList: [{stars:3,review:'Narwhal kombucha distillery, retro health goth cold-pressed next level intelligentsia meggings. Deep v edison bulb umami franzen mixtape etsy. Asymmetrical kinfolk crucifix portland, ennui kickstarter hammock la croix echo park etsy microdosing humblebrag hexagon.'},{stars:5,review:'Photo booth everyday carry chillwave, cardigan aesthetic af normcore hoodie irony chambray church-key XOXO. Shabby chic distillery mustache, cold-pressed kickstarter neutra YOLO keffiyeh normcore woke. Banjo wolf photo booth, paleo listicle waistcoat'},{stars: 2, review:'runch crucifix pug fam, lyft tumeric tofu hexagon echo park pok pok tote bag. Godard cold-pressed coloring book umami, YOLO viral typewriter readymade hexagon selvage gochujang lumbersexual. PBR&B stumptown twee, wayfarers gentrify keffiyeh trust fund hexagon four dollar toast flannel.'}],
			RatingInput:''
		}
	}
	render () {
		return (
      <div className="main-container">
				<UserRatingProfile
					Username={this.state.Username}
					AverageStars ={this.state.AverageStars}
					HouseName ={this.state.HouseName}
				/>
				<div className ="write-rating"><input/>
				<input/><button>Submit</button></div>
				<div></div>


				<div className="rating-list">
					<RatingList RatingList = {this.state.RatingList} />
					</div>


			</div>
    )
	}
}

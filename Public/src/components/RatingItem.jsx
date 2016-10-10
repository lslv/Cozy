import React, { Component } from 'react'

const RatingItem = ({stars, review, reviewer}) => {

	return (

			<div className="rateItem">
				<div className="star">{stars} <i className="fa fa-star fa-lg" aria-hidden="true"></i>

				</div>
				<div className="reviewer">{reviewer} says: "</div>

				<div className="reviewText">
					{review}
					<span id="quotes">"</span>
				</div>

			</div>

  )
}

export default RatingItem

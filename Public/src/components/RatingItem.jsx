import React, { Component } from 'react'

const RatingItem = ({stars, review, reviewer}) => {
	return (

    <div className="Ratings">

			<div className="stars">{reviewer} has given {stars} Stars </div>

			<div className="review">{review}</div>
		</div>

  )
}

export default RatingItem

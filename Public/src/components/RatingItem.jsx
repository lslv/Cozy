import React, { Component } from 'react'

const RatingItem = ({star, review, reviewer}) => {
	return (
    <li className="stars"> Stars:{star} Review:{review}  Reviewer:{reviewer}</li>
  )
}

export default RatingItem

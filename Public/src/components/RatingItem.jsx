import React, { Component } from 'react'

const RatingItem = ({stars, review}) => {
	return (
    <li className="stars">Stars:{stars}   Review:{review}</li>
  )
}

export default RatingItem

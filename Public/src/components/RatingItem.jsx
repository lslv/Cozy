import React, { Component } from 'react'

const RatingItem = ({stars, review, reviewer}) => {
	return (
    <li className="stars"> Stars:{stars} Review:{review}  Reviewer:{reviewer}</li>
  )
}

export default RatingItem

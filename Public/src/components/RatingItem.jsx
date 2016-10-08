import React, { Component } from 'react'
import {Grid, Col, Row} from 'react-bootstrap'

const RatingItem = ({stars, review, reviewer}) => {
	return (

    <li className="Ratings">

		<Row>
		<Col md={6}>
			<div className="stars">Stars:{stars}</div>
		</Col>
		<Col md={6}>
			<div className="Reviewer">Reviewer:{reviewer}</div>
		</Col>
		</Row>

		<br></br>
			<div className="review">Review:{review}</div>
		</li>

  )
}

export default RatingItem

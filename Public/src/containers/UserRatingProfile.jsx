import React, { Component } from 'react'
import { Link } from 'react-router'

const UserRatingProfile = ({Username, AverageStars, HouseName}) => {

	return (
    <div>
			<form>
			<input type="text" placeholder="Search UserName Here"/>
			</form>
      <div className="UserOverview"><h5>{Username}</h5></div>
      <div className="UserOverview"><p>{AverageStars}</p></div>
      <div className="UserOverview"><p>{HouseName}</p></div>
    </div>
  )
}

export default UserRatingProfile

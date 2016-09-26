import React, { Component } from 'react'
import { Link } from 'react-router'

export default class HouseSetup extends Component {
	render () {
		return (
            <div>
                <button>
                    <Link to="/create_house">Create a house</Link>
                </button>
                <button>
                    <Link to="/join_house">Join a house</Link>
                </button>
            </div>
        )
	}
}

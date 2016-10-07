import React, { Component } from 'react'
import { Link } from 'react-router'
import _ from 'lodash'

export default class HouseSetup extends Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
    //here check if the user logged in via FB auth
        //if so, save data on url query str to session storage
		const { query } = this.props.location
		if(!_.isEmpty(query)){
			sessionStorage.setItem('id', query.id)
			sessionStorage.setItem('username', query.user_name)
			sessionStorage.setItem('pay_percentage', query.pay_percentage)
			sessionStorage.setItem('admin', query.admin)
			sessionStorage.setItem('fb_pic', query.fb_picture)
		}
	}

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

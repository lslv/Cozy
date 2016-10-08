import React, { Component } from 'react'
import { Router, browserHistory, Link } from 'react-router'
import axios from 'axios'

import Navbar from '../components/Navbar'

export default class CreateHouse extends Component{
	constructor(props){
		super(props)

		this.state= {houseName: ''}

		this.onCreateHouse = this.onCreateHouse.bind(this)
	}
	render () {
		return (
      <div>
      	<Navbar />
        <h1>CreateHouse</h1>
        <form>
          <input
            placeholder="House Name"
						value={this.state.houseName}
						onChange={event => this.setState({houseName: event.target.value})}
						/>
          <input
            type="submit"
						onClick={event => this.onCreateHouse(this.state.houseName)}/>
        </form>
      </div>
    )
	}
	onCreateHouse(houseName){
		console.log(houseName)
		axios.post('/api/houses/addHouse', {
			houseName: houseName
		})
		.then(response => {
			console.log('the final then')
			sessionStorage.setItem('house_id', response.data.id)
			//send user id and house id
			//set house id and admin
			axios.put('/api/users/addHouseId', {
				user_id: sessionStorage.getItem('id'),
				house_id: response.data.id,
				admin: true
			})
			.then(res => {
				sessionStorage.setItem('admin', true)
				this.context.router.push('/dashboard')
			})
			.catch(error => console.log(error))
		})
		.catch(error => console.log(error))
	}
}

CreateHouse.contextTypes = {
	router: React.PropTypes.object
}

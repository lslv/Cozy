import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getResults, postHouseId } from '../actions/actions_join_search'

class House extends Component{
	constructor (props) {
		super(props)

		this.handleJoinHouse = this.handleJoinHouse.bind(this)
	}
	handleJoinHouse(houseId){
		console.log('house id in func', houseId)
		sessionStorage.setItem('house_id', houseId)
		this.props.postHouseId(houseId)
		this.context.router.push('/dashboard')
	}

	render(){
		let houses = this.props.houses.map(house =>{
			return (
				<li key={house.house_name}
						onClick={event =>{
							this.handleJoinHouse(house.id)}
						}>
						{house.house_name}</li>
			)
		})
		console.log('this propsin house search', this.props)
		return(
      <ul>
			{houses}
      </ul>
    )
	}
}

House.contextTypes = {
	router: React.PropTypes.object
}

function mapStateToProps(state){
	return{
		houses: state.houses
	}
}



export default connect(mapStateToProps, {getResults, postHouseId})(House)

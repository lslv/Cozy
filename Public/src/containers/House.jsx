import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getResults, postHouseId } from '../actions/actions_join_search'
import {ListGroup, ListGroupItem, Button} from 'react-bootstrap'

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
					<ListGroupItem key={house.house_name}>
						<div className="houseContainer">
							<span className="houseName">{house.house_name}</span>
							<Button className="joinButton" bsStyle="primary"
							onClick={event =>{this.handleJoinHouse(house.id)}}>
							Join House
							</Button>
						</div>
					</ListGroupItem>
			)
		})
		return(
      <ListGroup>
			{houses}
      </ListGroup>
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

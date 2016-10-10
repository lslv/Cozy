import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Modal } from 'react-bootstrap'
import { getResults } from '../actions/actions_join_search'
import House from './House'
import Navbar from '../components/Navbar'
import {Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap'


class JoinHouse extends Component{
	constructor (props) {
		super (props)
		this.state = {searchText: ''}

		this.handleSearchInput = this.handleSearchInput.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	handleSubmit(e){
		e.preventDefault()
		this.props.getResults(this.state.searchText)
	}
	handleSearchInput(event){
		this.setState({searchText: event.target.value})
	}
	render () {
		return (
      <div>
      <Navbar />
	      <div className="joinHouseContainer">
	      	<h1>Join A House</h1>
	        <form onSubmit={this.handleSubmit}>
		        <FormGroup>
		          <FormControl
		          	className="joinHouseSearch"
		          	type="text"
		            value={this.state.searchText}
		            onChange={this.handleSearchInput}
		            placeholder="search" />
		            <Button type="submit">Search</Button>
				</FormGroup>
	        </form>
			<House />
		</div>
      </div>
    )
	}

}

function mapStateToProps({houses}){
	return {houses}
}

export default connect(mapStateToProps, {getResults})(JoinHouse)

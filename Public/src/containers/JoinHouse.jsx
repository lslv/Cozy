import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getResults } from '../actions/actions_join_search'
import House from './House'

class JoinHouse extends Component{
	constructor (props) {
		super (props)
		this.state = {searchText: ''}

		this.handleSearchInput = this.handleSearchInput.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	handleSubmit(){
		this.props.getResults(this.state.searchText)
	}
	handleSearchInput(event){
		this.setState({searchText: event.target.value})
	}
	render () {
		return (
      <div>
      <h1>Join House</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.searchText}
            onChange={this.handleSearchInput}
            placeholder="search" />
        </form>
				<House />
      </div>
    )
	}

}

function mapStateToProps({houses}){
	return {houses}
}

export default connect(mapStateToProps, {getResults})(JoinHouse)

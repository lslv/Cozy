import React, { Component } from 'react'
import axios from 'axios'

export default class JoinHouse extends Component{
	constructor (props) {
		super (props)
		this.state = {searchText: ''}
	}
	render () {
		return (
      <div>
      <h1>Join House</h1>
        <form>
          <input
            value={this.state.searchText}
            onChange={event => this.onSearch(event.target.value)}
            placeholder="search" />
        </form>
      </div>
    )
	}
	onSearch(searchText){
		this.setState({searchText}, () =>{
			axios.get('/api/houses/search', {
				params:{
					search: this.state.searchText
				}
			})
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
		})

	}
}

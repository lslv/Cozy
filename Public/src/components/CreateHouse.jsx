import React, { Component } from 'react'

export default class CreateHouse extends Component{

	render () {
		return (
      <div>
        <h1>CreateHouse</h1>
        <form>
          <input
            placeholder="House Name"/>
          <input
            type="submit"/>
        </form>
      </div>
    )
	}
}

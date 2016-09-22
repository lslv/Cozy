import React, { Component } from 'react'

export default class Login extends Component{
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <input value="username" />
        <input value="password" /> <button>login</button>
      </div>
    )
  }
}

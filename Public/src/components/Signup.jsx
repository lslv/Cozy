import React, { Component } from 'react'
import axios from 'axios'

export default class Signup extends Component{
  constructor(props){
    super(props)

    this.state = {
      Firstname: 'First Name',
      Lastname: 'Last Name',
      Username: 'User Name',
      Email: 'Email',
      Password: 'Password'
    }
  }
  render () {
    return (
      <div>
        <input
        value={this.state.Firstname}
        onChange={event => this.onFirstnameChange(event.target.value)}
        /><br />
        <input
        value={this.state.Lastname}
        onChange={event => this.onLastnameChange(event.target.value)}
        /><br />
        <input
        value={this.state.Username}
        onChange={event => this.onUsernameChange(event.target.value)}
        /><br />
        <input
        value={this.state.Email}
        onChange={event => this.onEmailChange(event.target.value)}
        /><br />
        <input
        value={this.state.Password}
        onChange={event => this.onPasswordChange(event.target.value)}
        /><br />
        <button onClick={event => this.onSignup()}>Submit</button>
      </div>
    )
  }

  onFirstnameChange(Firstname){
    this.setState({Firstname})
  }
  onLastnameChange(Lastname){
    this.setState({Lastname})
  }
  onUsernameChange(Username){
    this.setState({Username})
  }
  onEmailChange(Email){
    this.setState({Email})
  }
  onPasswordChange(Password){
    this.setState({Password})
  }

  onSignup(){
    axios.post('/api/users/signup',{
      firstname: this.state.Firstname,
      lastname: this.state.Lastname,
      username: this.state.Username,
      email: this.state.Email,
      password: this.state.Password
    })
    .then((response)=>{
      console.log(response)
      //this should be a token in the future
      //sessionStorage.setItem('user', response.data.user_name)
      console.log(sessionStorage.getItem('user'))
    })
    .catch((error)=>{
      console.log(error)
    })
  }

}

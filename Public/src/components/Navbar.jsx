import React, { Component } from 'react'
import { Nav, Navbar, NavDropdown, NavItem, MenuItem } from 'react-bootstrap'
import { Link } from 'react-router'

export default class NavBar extends Component {
	constructor(props) {
		super(props)

	}

	showUserProfilePic() {
		const fb_pic = sessionStorage.getItem('fb_pic')
		const id = sessionStorage.getItem('id')

		if(fb_pic) {
			return ( <img src={fb_pic} className='navbar-userpic'/> )
		} 
		else if(id && !fb_pic) {
			return ( <img src='../../assets/profile-placeholder.png' className='navbar-userpic'/> )
		} else {
			return ( <noscript/> )
		}
	}

	checkLoginStatus() {
		const id = sessionStorage.getItem('id')

		if(id) {
			return (
			<div className='nav-container'>
			<NavItem>
	        <Link to='/dashboard' className='nav-text'>Dashboard</Link>
	        </NavItem>
	        <NavItem>
		      <Link to='/logout' className='nav-text'>Logout</Link>
		    </NavItem>
		    </div>
			)
		} else {
			return (
			<div className='nav-container'>
			<NavItem>
	        <Link to='/login' className='nav-text'>Login</Link>
	        </NavItem>
	        <NavItem>
		      <Link to='/signup' className='nav-text'>Signup</Link>
		    </NavItem>
		    </div>
			)

		}
	}

	showUserNameOnLogin() {
		const user = sessionStorage.getItem('username')
		if(user) {
			return ( <li>Welcome home, {user}</li> )
		} else {
			return ( <Link to='/'>Cozy</Link> )
		}
	}

	render() {
		return (
		<Navbar inverse bsClass='navbar'>
		    <Navbar.Header>
		    {this.showUserProfilePic()}
		      <Navbar.Toggle />
		    </Navbar.Header>
		    <Navbar.Collapse>
		      <Navbar.Brand bsStyle='brandname'>
		       {this.showUserNameOnLogin()} 
		      </Navbar.Brand>
		      <Nav pullRight>
		        {this.checkLoginStatus()}
		      </Nav>
		    </Navbar.Collapse>
  		</Navbar>
		)
	}
}

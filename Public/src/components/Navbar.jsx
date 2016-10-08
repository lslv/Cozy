import React, { Component } from 'react'
import { Nav, Navbar, NavDropdown, NavItem, MenuItem } from 'react-bootstrap'
import { Link } from 'react-router'

export default class NavBar extends Component {
	constructor(props) {
		super(props)

	}

	showUserProfilePic() {
		const fb_pic = sessionStorage.getItem('fb_pic')

		if(fb_pic) {
			return (
				<img src={fb_pic} className='navbar-userpic'/>
			)
		} else {
			return ( <noscript />)
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
		        <Link to='/'>Cozy</Link>
		      </Navbar.Brand>
		      <Nav pullRight>
		        <NavItem>
		        <Link to='/login' className='nav-text'>Login</Link>
		        </NavItem>
		        <NavItem>
		        <Link to='/signup' className='nav-text'>Signup</Link>
		        </NavItem>
		        <NavItem>
		        <Link to='/logiut' className='nav-text'>Logout</Link>
		        </NavItem>
		      </Nav>
		    </Navbar.Collapse>
  		</Navbar>
		)
	}
}
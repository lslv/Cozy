import React, { Component } from 'react'
import { Nav, Navbar, NavDropdown, NavItem, MenuItem } from 'react-bootstrap'
import { Link } from 'react-router'

export default class NavBar extends Component {
	constructor(props) {
		super(props)

	}

	render() {
		return (
		<Navbar inverse bsClass='navbar'>
		    <Navbar.Header>
		      <Navbar.Toggle />
		    </Navbar.Header>
		    <Navbar.Collapse>
		      <Nav>
		      </Nav>
		      <Navbar.Brand>
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
		        <Link to='/logout' className='nav-text'>Logout</Link>
		        </NavItem>
		      </Nav>
		    </Navbar.Collapse>
  		</Navbar>
		)
	}
}

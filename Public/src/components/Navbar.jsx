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
		      <Navbar.Brand bsClass='nav-text'>
		        <Link to='/'>Cozy</Link>
		      </Navbar.Brand>
		      <Nav pullRight>
		        <NavItem bsClass='nav-text'>
		        <Link to='/login'>Login</Link>
		        </NavItem>
		        <NavItem bsClass='nav-text'>
		        <Link to='/signup'>Signup</Link>
		        </NavItem>
		      </Nav>
		    </Navbar.Collapse>
  		</Navbar>
		)
	}
}
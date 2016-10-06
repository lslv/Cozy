import React, { Component } from 'react'
import { Nav, Navbar, NavDropdown, NavItem, MenuItem } from 'react-bootstrap'

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
		        <a href="#">Cozy</a>
		      </Navbar.Brand>
		      <Nav pullRight>
		        <NavItem eventKey={1} href="#">Sign In</NavItem>
		        <NavItem eventKey={2} href="#">Sign Up</NavItem>
		      </Nav>
		    </Navbar.Collapse>
  		</Navbar>
		)
	}
}
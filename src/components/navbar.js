import React from "react";
import {Link} from 'react-router-dom';
import {Container, Navbar,NavDropdown,Nav} from 'react-bootstrap';
const NavBar = ()=>{
    return (
        <div>
            <Navbar bg="light" expand="lg">
            <Container>
            <Navbar.Brand href="/">Document Generator</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/normal-documentation">Normal Documentation</Nav.Link>
                <Nav.Link as={Link} to="/api-documentation">API Documentation</Nav.Link>
            </Nav>
            </Navbar.Collapse>
            </Container>

            </Navbar>

            
        </div>
    );
}

export default NavBar;
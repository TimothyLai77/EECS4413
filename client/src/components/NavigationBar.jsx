import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import logo from '../assets/images/logo.jpeg';
import '../assets/styles/Navbar.css';

const NavigationBar = ({ isLoggedIn, onLogout }) => {
    return (
        <>
          <Navbar bg="dark" data-bs-theme="dark">
            <Container>
              <Navbar.Brand href="/">
              <Image 
                  src={logo} 
                  rounded 
                  className="navbar-logo" // Add CSS class
                  alt="Company Logo"
                />
              </Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/catalog">Product Cataloge</Nav.Link>
                <Nav.Link href="/cart">Cart</Nav.Link>
                <Nav.Link href="/login">Login/Register</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <br />
     
        </>
      );
};

export default NavigationBar;

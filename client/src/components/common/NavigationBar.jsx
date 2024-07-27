import React from 'react';
import {Container, Row, Col, Button, Form} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import logo from '../../assets/images/logo.jpeg';
import '../../assets/styles/Navbar.css';
import { FaSearch } from "react-icons/fa";
const NavigationBar = ({ isLoggedIn, onLogout }) => {
    return (
        <>
          <Navbar bg="dark" data-bs-theme="dark" sticky="top">
            <Container>
              <Navbar.Brand href="/">
              <Image 
                  src={logo} 
                  rounded 
                  className="navbar-logo" 
                  alt="Company Logo"
                />
              </Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/catalog">Product Cataloge</Nav.Link>
                <Nav.Link href="/cart">Cart</Nav.Link>
                <Nav.Link href="/login">Login/Register</Nav.Link>
                <Nav.Link href="/admin">Temp admin access</Nav.Link>
              </Nav>
            </Container>
            <Form inline>
        <Row className='row justify-content-start'>
          
          <Col xs="auto" className='md-4'>
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
            /> 
          </Col>
          <Col>
          <Button><FaSearch /></Button>
          </Col>
        </Row>
      </Form>
          </Navbar>
          <br />
     
        </>
      );
};

export default NavigationBar;

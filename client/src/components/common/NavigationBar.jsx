import React from 'react';
import {Container, Row, Col, Button, Form} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import logo from '../../assets/images/logo.jpeg';
import '../../assets/styles/Navbar.css';
import { FaSearch } from "react-icons/fa";

import { useNavigate } from 'react-router-dom';
const NavigationBar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
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
                <Nav.Link onClick={() => {navigate("/")}}>Home</Nav.Link>
                <Nav.Link onClick={() => {navigate("/catalog")}}>Product Cataloge</Nav.Link>
                <Nav.Link onClick={() => {navigate("/cart")}}>Cart</Nav.Link>
                <Nav.Link onClick={() => {navigate("/login")}}>Login/Register</Nav.Link>
                <Nav.Link onClick={() => {navigate("/admin")}}>Temp admin access</Nav.Link>
              </Nav>
            </Container>
            <Form inline>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit"><FaSearch /></Button>
          </Col>
        </Row>
      </Form>
          </Navbar>
          <br />
     
        </>
      );
};

export default NavigationBar;

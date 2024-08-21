import React from 'react';
import {Container, Row, Col, Button, Form} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import logo from '../../assets/images/logo.jpeg';
import '../../assets/styles/Navbar.css';
import { FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/userManagement';

import { useNavigate } from 'react-router-dom';
const NavigationBar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(store => store.user.isLoggedIn);
  const userInfo = useSelector(store => store.user.loggedInUser);
  const isAdmin = useSelector(store => store.user.isAdmin); 

  const handleLogout = async () => {
    //short circuit no-op if the user is not even logged in and this function is called
    if (!isLoggedIn) return;
    await dispatch(logout()); 
    navigate("/");
  }
  console.log(isAdmin);
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
                {
                  (!isLoggedIn)? 
                    (<Nav.Link onClick={() => {navigate("/login")}}>Login/Register</Nav.Link>):
                    (<Nav.Link onClick={handleLogout}>Logout</Nav.Link>)
                }
                {
                  (isLoggedIn)? 
                    (<Nav.Link onClick={() => {navigate("/profile")}}>Profile</Nav.Link>):
                    null
                }
                {
                  (isLoggedIn && isAdmin)? 
                    (<Nav.Link onClick={() => {navigate("/admin")}}>Admin</Nav.Link>):
                    null 
                }
                {isLoggedIn? (
                <Container>
                  <p style={{color: "white"}}>{`Hello ${userInfo.firstName} ${userInfo.lastName}`}</p>
                </Container>
                
                ): null }
              </Nav>
              {/* render the logout button only if the user is logged in */}
              

            </Container>

          </Navbar>
          <br />
     
        </>
      );
};

export default NavigationBar;

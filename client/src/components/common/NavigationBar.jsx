import React from 'react';
import {Container, Row, Col, Button, Form} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import logo from '../../assets/images/logo.png';
import '../../assets/styles/Navbar.css';
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
    if (!isLoggedIn) return;
    await dispatch(logout()); 
    navigate("/");
  }
  console.log(isAdmin);
    return (
        <>
          <Navbar  className="bg-body-tertiary"  bg="dark" data-bs-theme="dark" sticky="top">
           
            
           
             

              <Container className='justify-content-center'>
              <Nav fill variant="tabs" defaultActiveKey="/home">
              <Nav.Item> <Nav.Link onClick={() => {navigate("/")}}>Home</Nav.Link></Nav.Item>
              <Nav.Item> <Nav.Link onClick={() => {navigate("/catalog")}}>Product Cataloge</Nav.Link></Nav.Item>
              <Nav.Item> <Nav.Link onClick={() => {navigate("/cart")}}>Cart</Nav.Link></Nav.Item>
                {
                  (!isLoggedIn)? 
                   (<Nav.Item><Nav.Link onClick={() => {navigate("/login")}}>Login/Register</Nav.Link></Nav.Item>):
                    (<Nav.Item><Nav.Link onClick={handleLogout}>Logout</Nav.Link></Nav.Item>)
                }
                {
                  (isLoggedIn)? 
                    (<Nav.Item><Nav.Link onClick={() => {navigate("/profile")}}>Profile</Nav.Link></Nav.Item>):
                    null
                }
                {
                  (isLoggedIn && isAdmin)? 
                    (<Nav.Item><Nav.Link onClick={() => {navigate("/admin")}}>Admin</Nav.Link></Nav.Item>):
                    null 
                }
                
                </Nav>
                </Container>
                {isLoggedIn? (
                <Container>
                  <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>Hello, {userInfo.firstName} {userInfo.lastName}</Navbar.Text>
                  </Navbar.Collapse>
                </Container>
                
                ): null }
             
              {/* render the logout button only if the user is logged in */}
              

          
          </Navbar>
          <br />
     
        </>
      );
};

export default NavigationBar;

import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { login, createAccount } from "../../features/userManagement"
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [sameAddress, setSameAddress] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const handleSubmit =  async (e) => {


    e.preventDefault();
    if (isLogin) {
      if (!email || !password) {
        setError('Please fill in all fields');
      } else {
        setError('');
        // Handle successful login logic
        // User is logeed in and handle the login 
        console.log('Login submitted:', { email, password });
        const authPacket = {
          email: email,
          password: password
        };

        
        try{
          await dispatch(login(authPacket));
          await navigate("/")
        }catch (err){
          setError("Invalid Login Credentials");
        }
   
      }
    } else {
      if (!email || !password || !confirmPassword || !firstName || !lastName || !billingAddress || (!sameAddress && !shippingAddress)) {
        setError('Please fill in all fields');
      } else if (password !== confirmPassword) {
        setError('Passwords do not match');
      } else {
        setError('');
        // Handle successful registration logic 
        // Below code for Debugging that the value is stored in the object.
        console.log('Registration submitted:', {
          email,
          password,
          firstName,
          lastName,
          billingAddress,
          shippingAddress: sameAddress ? billingAddress : shippingAddress,
        });
      }
    }
  };

  const handleSameAddressChange = (e) => {
    setSameAddress(e.target.checked);
    if (e.target.checked) {
      setShippingAddress(billingAddress);
    } else {
      setShippingAddress('');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 gradient-background">
      <div className="login-form w-50 p-4 bg-white rounded shadow">
        <h2 className="text-center mb-4">{isLogin ? 'Login' : 'Register'}</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          {!isLogin && (
            <>
              <Form.Group controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBillingAddress">
                <Form.Label>Billing Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Billing Address"
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formSameAddress">
                <Form.Check
                  type="checkbox"
                  label="Shipping address is the same as billing address"
                  checked={sameAddress}
                  onChange={handleSameAddressChange}
                />
              </Form.Group>
              {!sameAddress && (
                <Form.Group controlId="formShippingAddress">
                  <Form.Label>Shipping Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Shipping Address"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                  />
                </Form.Group>
              )}
            </>
          )}
          <Button variant="primary" type="submit" className="mt-3 w-100">
            {isLogin ? 'Login' : 'Register'}
          </Button>
          <div className="text-center mt-3">
            <a href="#" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'First time here? Register' : 'Already have an account? Login'}
            </a>
          </div>
        </Form>
      </div>
    </Container>
  );
}

export default LoginPage;

import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      if (!email || !password) {
        setError('Please fill in all fields');
      } else {
        setError('');
        // Handle successful login logic
        console.log('Login submitted:', { email, password });
      }
    } else {
      if (!email || !password || !confirmPassword) {
        setError('Please fill in all fields');
      } else if (password !== confirmPassword) {
        setError('Passwords do not match');
      } else {
        setError('');
        // Handle successful registration logic
        console.log('Registration submitted:', { email, password });
      }
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
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
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

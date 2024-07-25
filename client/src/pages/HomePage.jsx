import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar';
import image from '../assets/images/dummyProduct.jpeg';
import homeImg from '../assets/images/dummyHomePage.jpeg';
import ItemCard from '../components/common/itemCard';
import '../assets/styles/HomePage.css';

// These are dummy product.
const topPicks = [
  { id: 1, name: 'Product 1', price: 29.99, info:"This is the product information", image: image },
  { id: 2, name: 'Product 2', price: 49.99, info:"This is the product information", image: image },
  { id: 3, name: 'Product 3', price: 19.99, info:"This is the product information", image: image },
];

const HomePage = () => {
  return (
    <div>
      <NavigationBar isLoggedIn={false} onLogout={() => {}} />
      <Container fluid className='customContainer'>
        <div className="my-3 text-center customHomePage">
          <h1>Company Name</h1>
          <img
            src={homeImg}
            alt="Hero"
            className="img-fluid w-100"
            style={{ height: '1000',objectFit: 'cover' }}
          />
        </div>
        <h2 className="my-4">Top Picks by Owner</h2>
        <Row>
          {topPicks.map((product) => (
            <ItemCard key={product.id} product={product} />
          ))}
        </Row>
        
      </Container>
    </div>
  );
};

export default HomePage;

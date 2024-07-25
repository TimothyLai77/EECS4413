import React, { useEffect, useState } from 'react';
import { Container, Row} from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar';
import { getTopPicks } from '../services/productService';
import homeImg from '../assets/images/dummyHomePage.jpeg';
import ItemCard from '../components/common/itemCard';
import '../assets/styles/HomePage.css';



const HomePage = () => {
    const [topPicks, setTopPicks] = useState([]);

  useEffect(() => {
    const fetchTopPicks = async () => {
      const products = await getTopPicks();
      setTopPicks(products);
    };

    fetchTopPicks();
  }, []);


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

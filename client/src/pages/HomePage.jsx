import React, { useEffect, useState } from 'react';
import { Container, Row} from 'react-bootstrap';
import NavigationBar from '../components/common/NavigationBar';
import { getTopPicks } from '../services/topPickProduct';
import ItemCard from '../components/common/itemCard';
import HomePageSlider from '../components/HomePageSlider';


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
        <div className="my-3 text-center">
          <h1>Company Name</h1>
          <HomePageSlider/>
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

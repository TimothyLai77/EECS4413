import React, { useEffect, useState } from 'react';
import { Container, Row} from 'react-bootstrap';
import NavigationBar from '../../components/common/NavigationBar';
import { getTopPicks } from '../../services/topPickProduct';
import ItemCard from '../../components/common/itemCard';
import HomePageSlider from '../../components/HomePageSlider';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/styles/HomePage.css';

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
        </div>
        <div class='carousels'>
            <HomePageSlider/>
        </div>

        </Container>
        <Container fluid className='customContainer'>
        <h2 className="my-4">Top Picks by Owner</h2>
        <div className="customRow">
        <Row sm={4} md={'auto'} className="g-4">
          {topPicks.map((product) => (
            <ItemCard key={product.id} product={product} />
          ))}
        </Row>
        </div>
        </Container>
     
    </div>
  );
};

export default HomePage;

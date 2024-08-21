import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import NavigationBar from '../../components/common/NavigationBar';
import { getTopPicks } from '../../services/topPickProduct';
import ItemCard from '../../components/common/itemCard';
import HomePageSlider from '../../components/HomePageSlider';



//REMOVE THIS BLOCK WHEN DONE TESTING
import {  useSelector } from 'react-redux';
import {checkout} from '../../features/shoppingCart';

const HomePage = () => {
    const [topPicks, setTopPicks] = useState([]);


  //REMOVE THIS BLOCK WHEN DONE TESTING
  const shoppingCart = useSelector(store => {
    return store.shoppingCart.cart;
  });
  const catalog = useSelector(store => store.catalog.products);

  console.log(shoppingCart);
  useEffect(() => {
    const fetchTopPicks = async () => {
      const products = await getTopPicks();
      setTopPicks(products);
    };

    fetchTopPicks();
  }, []);

  let sortedCatalog = catalog.toSorted((a,b) => {
      const priceA = a.price;
      const priceB = b.price;
      return priceA - priceB;
  })

  sortedCatalog = sortedCatalog.slice(0,3);

  return (
    <div>
      <NavigationBar isLoggedIn={false} onLogout={() => {}} />

      {/* REMOVE THIS BLOCK WHEN DONE TESTING */}
      {/* <Button onClick={()=> {
        dispatch(login({
            email: "root@app.com",
            password: "root"
        }));
      }}>LOGIN AS ROOT TEMP</Button>
      
      <Button onClick={()=> {
        dispatch(logout());
      }}>LOGOUT TEMP</Button>

    <Button onClick={()=> {
        dispatch(checkout(shoppingCart));
      }}>CHECKOUT TEMP</Button>
 */}


      <Container fluid className='customContainer'>
        <div className="my-3 text-center">
          <h1>Company Name</h1>
        </div>
        <div class='carousels'>
            <HomePageSlider/>
        </div>

        </Container>
        <Container fluid className='customContainer'>
        <h2 className="my-4">Current Lowest Price Items!</h2>
        <Row>
          {sortedCatalog.map((product) => (
            <ItemCard key={product.id} isAdmin={false} product={product} />
          ))}
        </Row>
        </Container>
     
    </div>
  );
};

export default HomePage;

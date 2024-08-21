import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import NavigationBar from '../../components/common/NavigationBar';
import { getTopPicks } from '../../services/topPickProduct';
import ItemCard from '../../components/common/itemCard';
import HomePageSlider from '../../components/HomePageSlider';




import {  useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../features/shoppingCart';

const HomePage = () => {
  const dispatch = useDispatch();
  const catalog = useSelector(store => store.catalog.products);

  let sortedCatalog = catalog.toSorted((a,b) => {
      const priceA = a.price;
      const priceB = b.price;
      return priceA - priceB;
  })

  sortedCatalog = sortedCatalog.slice(0,3);

  return (
    <div>
      <NavigationBar isLoggedIn={false} onLogout={() => {}} />


      <Container fluid className='customContainer'>
        <div className="my-3 text-center">
          <h1>Byte Market</h1>
        </div>
        <div class='carousels'>
            <HomePageSlider/>
        </div>

        </Container>
        <Container fluid className='customContainer'>
        <h2 className="my-4">Current Lowest Price Items!</h2>
        <Row>
          {sortedCatalog.map((product) => {
            const handleAddToCart = () => {
              dispatch(addToCart({
                itemId: product.id,
                amount: 1
              }))
            }
            return (<ItemCard key={product.id} handleAddToCart={handleAddToCart} isAdmin={false} product={product} />);
          })}
        </Row>
        </Container>
     
    </div>
  );
};

export default HomePage;

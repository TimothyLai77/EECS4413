import React, { useState, useEffect } from 'react';
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {  Container, Row, Button } from 'react-bootstrap';
import {inventoryProducts} from '../../services/inventoryProducts';
import AdminNavBar from '../../components/common/adminComponents/adminNavbar';
import ItemCard from '../../components/common/itemCard.jsx';
import { useDispatch,useSelector } from 'react-redux';
import { fetchInventory, inventoryAddStock, inventoryDeductStock } from '../../features/catalog';

const AdminPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(store => {
    return store.catalog.products
  });



  useEffect(() => {
    // call the redux action to fetch inventory from backend 
    dispatch(fetchInventory());
  }, []);

  return (
    <div>
      <div className='adminNavbar'>
        <AdminNavBar />
      </div>
      <div>
       <h3>Listing products in our inventory!</h3> 
      </div>
      <div id='inventory'>
      <Container>
      <Row>
      {products.map(product => {
          const handleAddStock = () => {
            dispatch(inventoryAddStock({
              itemID: product.id,
              amount: 1
            }));
          }
          
          const handleRemoveStock = () => {
            dispatch(inventoryDeductStock({
              itemID: product.id,
              amount: 1
            }));
          }
          


          return (<ItemCard key={product.id} isAdmin={true} product={product} handleAddStock={handleAddStock} handleRemoveStock={handleRemoveStock}/>)
        })}
      </Row>
    </Container>
    </div>
        </div>

  );
};

export default AdminPage;

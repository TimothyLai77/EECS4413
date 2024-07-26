import React, { useState, useEffect } from 'react';
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {  Container, Row, Button } from 'react-bootstrap';
import {inventoryProducts} from '../../services/inventoryProducts';
import AdminNavBar from '../../components/common/adminComponents/adminNavbar';
import ItemCardInventory from '../../components/common/adminComponents/ItemCardInventory';



const AdminPage = () => {

  // This works in same ways as the catalog page  
  const [products, setProducts] = useState([]);

  // Fetch the product from inventory along with available stock when the component mounts
  const fetchProducts = async () => {
    const data = await inventoryProducts();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  return (
    <div>
      <div className='adminNavbar'>
        <AdminNavBar />
      </div>
      <div>
       <h3>Listing products in our inventory!</h3> <Button onClick={fetchProducts}>Refresh Products</Button>
      </div>
      <div id='inventory'>
      <Container>
      <Row>
        {products.map(product => (
          <ItemCardInventory key={product.id} product={product} />
        ))}
      </Row>
    </Container>
    </div>
        </div>

  );
};

export default AdminPage;

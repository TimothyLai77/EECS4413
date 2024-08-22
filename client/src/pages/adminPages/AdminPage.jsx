import React, { useState, useEffect } from 'react';
import { Container, Row, FormControl, InputGroup } from 'react-bootstrap';
import AdminNavBar from '../../components/common/adminComponents/adminNavbar';
import ItemCard from '../../components/common/itemCard.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInventory, inventoryAddStock, inventoryDeductStock } from '../../features/catalog';


const AdminPage = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  
  const products = useSelector(store => store.catalog.products);

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className='adminNavbar'>
        <AdminNavBar />
      </div>
      <div className="text-center">
        <h3>Listing products in our inventory!</h3>
        <div className="d-flex justify-content-center mb-3">
          <InputGroup style={{ maxWidth: '300px' }}>
            <FormControl
              placeholder="Search products 🔍"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </div>
      </div>
      <div id='inventory'>
        <Container>
          <Row>
            {filteredProducts.map(product => {
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

              return (
                <ItemCard
                  key={product.id}
                  isAdmin={true}
                  product={product}
                  handleAddStock={handleAddStock}
                  handleRemoveStock={handleRemoveStock}
                />
              );
            })}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default AdminPage;

import React,{useState,useEffect} from 'react';
import { Container, Row } from 'react-bootstrap';
import getProductCatalog from '../../services/catalogProducts';
import NavigationBar from '../../components/common/NavigationBar';
import ItemCard from '../../components/common/itemCard';
import { fetchInventory, inventoryAddStock, inventoryDeductStock } from '../../features/catalog';
import { useDispatch,useSelector } from 'react-redux';


function CatalogPage() {
  const dispatch = useDispatch();
  const products = useSelector(store => {
    return store.catalog.products
  });
  console.log(products);
  // State to hold the list of the products
 
  // Fetch the product catalog when the component mounts
  useEffect(() => {
    // call the redux action to fetch inventory from backend 
    dispatch(fetchInventory());
  }, []);

  return (
    <div>
      <NavigationBar isLoggedIn={false} onLogout={() => {}} />
      <Container>
      <h1 className="my-4">Product Catalogue</h1>
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

          return (<ItemCard key={product.id} product={product}  handleAddStock={handleAddStock} handleRemoveStock={handleRemoveStock}/>)
        })}
      </Row>
    </Container>
    </div>
  )
}

export default CatalogPage;
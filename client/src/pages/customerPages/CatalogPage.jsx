import React,{useState,useEffect} from 'react';
import { Container, Row, Form } from 'react-bootstrap';
import getProductCatalog from '../../services/catalogProducts';
import NavigationBar from '../../components/common/NavigationBar';
import ItemCard from '../../components/common/itemCard';
import { fetchInventory, inventoryAddStock, inventoryDeductStock, searchInventory } from '../../features/catalog';
import { useDispatch,useSelector } from 'react-redux';
import { addToCart } from '../../features/shoppingCart';


function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const products = useSelector(store => {
    return store.catalog.products
  });

  const shoppingCart = useSelector(store => {
    return store.shoppingCart.cart;
  });
  //console.log(shoppingCart);

  
  // State to hold the list of the products
 


  const handleSearch = async (e) => {
    e.preventDefault();
    try{
      if(searchTerm === ''){
        await dispatch(fetchInventory());
      }
      await dispatch(searchInventory(searchTerm))
      //alert(products);
    }catch{
      alert('search failed');
    }
  }

  console.log(products);
  return (
    <div>
      <NavigationBar isLoggedIn={false} onLogout={() => {}} />
      <Container>
      <h1 className="my-4">Product Catalogue</h1>


      <Container>
      <Form onSubmit={handleSearch}>
        <Form.Group controlId="searchProduct">
          <Form.Control
              type="text"
              placeholder="Search Inventory"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
      </Form>
      </Container>



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
          
          const handleAddToCart = () => {
            dispatch(addToCart({
              itemId: product.id,
              amount: 1
            }))
          }

          return (<ItemCard key={product.id} isAdmin={false} product={product} handleAddToCart={handleAddToCart} handleAddStock={handleAddStock} handleRemoveStock={handleRemoveStock}/>)
        })}
      </Row>
    </Container>
    </div>
  )
}

export default CatalogPage;
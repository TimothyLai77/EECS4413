import React,{useState,useEffect} from 'react';
import { Container, Row, Form, Dropdown } from 'react-bootstrap';
import getProductCatalog from '../../services/catalogProducts';
import NavigationBar from '../../components/common/NavigationBar';
import ItemCard from '../../components/common/itemCard';
import { fetchInventory, inventoryAddStock, inventoryDeductStock, searchInventory } from '../../features/catalog';
import { useDispatch,useSelector } from 'react-redux';
import { addToCart } from '../../features/shoppingCart';



const SORT_MODES = [


  { name:"price" , 
    key: "PRICE",
    comparator : (a, b) => {
      const priceA = a.price;
      const priceB = b.price;
      return priceB - priceA;
    }
  }
  ,
  { name:"Name" , 
    key: "NAME",
    comparator : (a, b) => {
      const nameA = a.name;
      const nameB = b.name;
      console.log(nameA);
      if(nameA > nameB){
        return 1;
      }else if(nameA < nameB){
        return -1;
      }else{
        return 0;
      }
    }
  }
]


function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const products = useSelector(store => {
    return store.catalog.products
  });

  const shoppingCart = useSelector(store => {
    return store.shoppingCart.cart;
  });

  const [sortMode, setSortMode] = useState(SORT_MODES[0].key);

  const sortModeObject = SORT_MODES.find(e => e.key === sortMode); 
  console.log(sortModeObject)

let sortedProducts = products;
let sortDropDownString = "Sorted By: "


if (sortModeObject.comparator && typeof sortModeObject.comparator === 'function'){
  sortedProducts = sortedProducts.toSorted(sortModeObject.comparator); 
  sortDropDownString += sortModeObject.name; 
}




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

      <Dropdown onSelect={e => {setSortMode(e)}}>
      <Dropdown.Toggle>
       {sortDropDownString}
      </Dropdown.Toggle>

      <Dropdown.Menu >

        {SORT_MODES.map(o => (
          <Dropdown.Item eventKey={o.key}>{o.name}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>

      <Row>
        {sortedProducts.map(product => {
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
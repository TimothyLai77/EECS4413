import React,{useState,useEffect} from 'react';
import { Container, Row, Col,Form, Dropdown } from 'react-bootstrap';
import NavigationBar from '../../components/common/NavigationBar';
import ItemCard from '../../components/common/itemCard';
import { fetchInventory, inventoryAddStock, inventoryDeductStock, searchInventory } from '../../features/catalog';
import { useDispatch,useSelector } from 'react-redux';
import { addToCart } from '../../features/shoppingCart';



const SORT_MODES = [
  { name:"Name: A-Z" , 
    key: "NAME",
    comparator : (a, b) => {
      const nameA = a.name;
      const nameB = b.name;
      if(nameA > nameB){
        return 1;
      }else if(nameA < nameB){
        return -1;
      }else{
        return 0;
      }
    }
  },
    { name:"Name: Z-A" , 
    key: "NAME_R",
    comparator : (a, b) => {
      const nameA = a.name;
      const nameB = b.name;
      if(nameA < nameB){
        return 1;
      }else if(nameA > nameB){
        return -1;
      }else{
        return 0;
      }
    }
  },

  { name:"Price: High to Low" , 
    key: "PRICE",
    comparator : (a, b) => {
      const priceA = a.price;
      const priceB = b.price;
      return priceB - priceA;
    }
  },
    { name:"Price: Low to High" , 
    key: "PRICE_r",
    comparator : (a, b) => {
      const priceA = a.price;
      const priceB = b.price;
      return priceA - priceB;
    }
  }
  ,
    { name:"Brand: A-Z" , 
    key: "BRAND",
    comparator : (a, b) => {
      const brandA = a.brand;
      const brandB = b.brand;
      if(brandA > brandB){
        return 1;
      }else if(brandA < brandB){
        return -1;
      }else{
        return 0;
      }
    }
  },
    { name:"Brand: Z-A" , 
    key: "BRAND_R",
    comparator : (a, b) => {
      const brandA = a.brand;
      const brandB = b.brand;
      if(brandA < brandB){
        return 1;
      }else if(brandA > brandB){
        return -1;
      }else{
        return 0;
      }
    }
  },


]


function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const dispatch = useDispatch();
  const products = useSelector(store => {
    return store.catalog.products
  });

  const shoppingCart = useSelector(store => {
    return store.shoppingCart.cart;
  });

  const [sortMode, setSortMode] = useState(SORT_MODES[0].key);

  const sortModeObject = SORT_MODES.find(e => e.key === sortMode); 

  const allBrands = ['All Brands', ...new Set(products.map(product => product.brand))];
  let filteredProducts = products;
  if (selectedBrand !== 'All Brands') {
    filteredProducts = filteredProducts.filter(product => product.brand === selectedBrand);
  }

  let sortedProducts = filteredProducts;
  let sortDropDownString = "Sorted By: "

  if (sortModeObject.comparator && typeof sortModeObject.comparator === 'function'){
    sortedProducts = sortedProducts.toSorted(sortModeObject.comparator); 
    sortDropDownString += sortModeObject.name; 
  }

 


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


      <Row>
      <Form onSubmit={handleSearch}>
        <Form.Group controlId="searchProduct">
          <Form.Control
              type="text"
              placeholder="Search Products by Name, Brand, ... 🔍"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
      </Form> 
      </Row>

    <Row>
    <Col md={3}>
            <Dropdown onSelect={e => setSortMode(e)} style={{ marginTop: 15, marginBottom: 15 }}>
              <Dropdown.Toggle>
                {sortDropDownString}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {SORT_MODES.map(o => (
                  <Dropdown.Item eventKey={o.key} key={o.key}>{o.name}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          {/* Brand Filter Dropdown */}
          <Col md={3}>
            <Dropdown onSelect={e => setSelectedBrand(e)} style={{ marginTop: 15, marginBottom: 15 }}>
              <Dropdown.Toggle>
                Filter by Brand: {selectedBrand}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {allBrands.map(brand => (
                  <Dropdown.Item eventKey={brand} key={brand}>{brand}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
    </Row>


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
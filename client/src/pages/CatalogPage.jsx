import React,{useState,useEffect} from 'react';
import { Container, Row } from 'react-bootstrap';
import getProductCatalog from '../services/productCatalog';
import NavigationBar from '../components/NavigationBar';
import ItemCard from '../components/common/itemCard';



function CatalogPage() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProductCatalog();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <NavigationBar isLoggedIn={false} onLogout={() => {}} />
      <Container>
      <h1 className="my-4">Product Catalogue</h1>
      <Row>
        {products.map(product => (
          <ItemCard key={product.id} product={product} />
        ))}
      </Row>
    </Container>
    </div>
  )
}

export default CatalogPage;
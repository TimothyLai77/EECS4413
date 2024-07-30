import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import '../../assets/styles/app.css';
import { FaCircleMinus, FaCirclePlus  } from "react-icons/fa6";
import Stack from 'react-bootstrap/Stack';

const ItemCard = ({ product, handleAddStock, handleRemoveStock, handleAddToCart, isAdmin }) => {

  console.log(product);
  return (
    <Col md={4} key={product.id}>
      <Card className="mb-4">
        <Card.Img variant="top" src={product.image} />
        <Card.Header>{product.brand}</Card.Header>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">${product.price.toFixed(2)}</Card.Subtitle>
          <Card.Text>{product.info}</Card.Text>
         {isAdmin && (<><Card.Text>Stock: {product.stock}</Card.Text></>)}
          <Button className="m-1" variant="primary">View Details</Button>

         {!isAdmin && <Button onClick={handleAddToCart} variant="secondary">Add to Cart</Button>}
      
       
          {isAdmin && (<> 
         
          <Button className="p-2 ms-auto" variant="outline-success" onClick={handleAddStock}><FaCirclePlus /></Button>
          <> </>
          <Button className="p-2" variant="outline-danger" onClick={handleRemoveStock}><FaCircleMinus /></Button>
          
          </>)
          }
       
          

        </Card.Body>
      </Card>
    </Col>
  );
};

export default ItemCard;

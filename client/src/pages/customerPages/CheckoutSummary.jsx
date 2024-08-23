import React from "react";
import {
  Button,
  Container,
  ListGroup,
  Card
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import '../../assets/styles/checkoutSummary.css';  

function CheckoutSummary() {
  const cart = useSelector((store) => store.shoppingCart.orderSummary);
  const storeProducts = useSelector((store) => store.catalog.products);
  const navigate = useNavigate();

  let total = 0;
  const cartContents = cart.map((item) => {
    const productInfo = storeProducts.find((itemFromCatalog) => item.itemId === itemFromCatalog.id);
    const productName = productInfo ? productInfo.name : "null";
    const productBrand = productInfo ? productInfo.brand : "null";
    const productPrice = productInfo ? productInfo.price : -1.0;
    const subTotal = item.amount * productPrice;
    total += subTotal;

    return (
      <ListGroup.Item
        key={item.itemId}
        className="list-group-item"
      >
        <b>{`${productBrand}: ${productName}`}</b>
        <br />
        {`Price: $${productPrice}`}
        <br />
        {`QTY: ${item.amount}`}
        <br />
        {`Subtotal: $${subTotal}`}
        <br />
      </ListGroup.Item>
    );
  });

  const today = new Date().toLocaleDateString();

  return (
    <div>
      <Container>
        <h1 className="my-4">Checkout Complete</h1>
        <Card className="card-container mb-4">
          <Card.Body>
            <ListGroup>
              <ListGroup.Item className="order-date">
                Order Date: {today}
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Title className="order-summary-title">Order Summary</Card.Title>
                {cartContents}
              </ListGroup.Item>
              <ListGroup.Item className="total-amount">
                Total: ${total}
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
        <Button
          onClick={() => navigate("/")}
          className="return-button"
        >
          Return to Store
        </Button>
      </Container>
    </div>
  );
}

export default CheckoutSummary;

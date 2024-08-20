import React from "react";
import {
  Button,
  Container,
  ListGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../components/common/NavigationBar";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  reduceFromCart,
  removeFromCart,
} from "../../features/shoppingCart";
function CheckoutSummary() {
  const cart = useSelector((store) => {
    return store.shoppingCart.orderSummary;
  });
  const dispatch = useDispatch();

  const storeProducts = useSelector((store) => {
    return store.catalog.products;
  });
  console.log(storeProducts);

  const navigate = useNavigate();
  console.log(cart);

  let total = 0;
  const cartContents = cart.map((item) => {
    let productName = "null";
    let productBrand = "null";
    let productPrice = -1.0;

    const productInfo = storeProducts.find((itemFromCatalog) => {
      return item.itemId === itemFromCatalog.id;
    });

    if (productInfo) {
      productName = productInfo.name;
      productBrand = productInfo.brand;
      productPrice = productInfo.price;
    }

    //console.log(productInfo);
    const subTotal = item.amount * productPrice;
    total += subTotal;
    const headerLine = `${productBrand}: ${productName}`;
    const productPriceLine = `$${productPrice}`;
    const quantityLine = `QTY: ${item.amount}`;
    const subTotalLine = `Subtotal $${subTotal}`;


    return (
      <ListGroup.Item>
        <b>{headerLine} </b>
        <br />
        {productPriceLine} <br />
        {quantityLine} <br />
        {subTotalLine} <br />
      </ListGroup.Item>
    );
  });

  return (
    <div>
      <Container>
        <h1 className="my-4">Checkout Complete</h1>
        <ListGroup>{cartContents}</ListGroup>
        <br />
        <ListGroup>
          <ListGroup.Item>Total: ${total}</ListGroup.Item>
        </ListGroup>
        <br />
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          Return to Store
        </Button>
      </Container>
    </div>
  );

  // return(
  // <div>

  //     <div>TEMP CART PAGE</div>
  //     <Button onClick={() => {
  //         navigate("/checkout/payment");
  //     }}>Payment</Button>

  // </div>);
}

export default CheckoutSummary;


// import React from "react";
// import {
//   Button,
//   Container,
//   ListGroup,
//   ButtonGroup,
//   Row,
//   Col,
// } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import NavigationBar from "../../components/common/NavigationBar";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   addToCart,
//   reduceFromCart,
//   removeFromCart,
// } from "../../features/shoppingCart";

// function CartPage() {
//   const cart = useSelector((store) => store.shoppingCart.cart);
//   const dispatch = useDispatch();

//   const storeProducts = useSelector((store) => store.catalog.products);

//   const navigate = useNavigate();

//   let total = 0;
//   const cartContents = cart.map((item, index) => {
//     let productName = "null";
//     let productBrand = "null";
//     let productPrice = -1.0;

//     const productInfo = storeProducts.find(
//       (itemFromCatalog) => item.itemId === itemFromCatalog.id
//     );

//     if (productInfo) {
//       productName = productInfo.name;
//       productBrand = productInfo.brand;
//       productPrice = productInfo.price;
//     }

//     const subTotal = item.amount * productPrice;
//     total += subTotal;
//     const headerLine = `${productBrand}: ${productName}`;
//     const productPriceLine = `$${productPrice}`;
//     const quantityLine = `QTY: ${item.amount}`;
//     const subTotalLine = `Subtotal $${subTotal}`;

//     // +- handlers
//     const handleAdd = () => {
//       dispatch(addToCart({ itemId: item.itemId }));
//     };

//     const handleMinus = () => {
//       dispatch(reduceFromCart({ itemId: item.itemId }));
//     };

//     const handleRemove = () => {
//       dispatch(removeFromCart({ itemId: item.itemId }));
//     };

//     return (
//       <ListGroup.Item key={index} className="my-3 p-3 border rounded">
//         <Row>
//           <Col xs={8}>
//             <b>{headerLine}</b>
//             <br />
//             {productPriceLine}
//             <br />
//             {quantityLine}
//             <br />
//             {subTotalLine}
//           </Col>
//           <Col xs={4} className="text-end">
//             <ButtonGroup className="mb-2">
//               <Button variant="outline-secondary" onClick={handleMinus}>
//                 -
//               </Button>
//               <Button variant="outline-secondary" onClick={handleAdd}>
//                 +
//               </Button>
//             </ButtonGroup>
//             <br />
//             <Button variant="danger" onClick={handleRemove}>
//               Remove from Cart
//             </Button>
//           </Col>
//         </Row>
//       </ListGroup.Item>
//     );
//   });

//   return (
//     <div>
//       <NavigationBar isLoggedIn={false} onLogout={() => {}} />
//       <Container>
//         <h1 className="my-4">Your Shopping Cart</h1>
//         <ListGroup>{cartContents}</ListGroup>
//         <ListGroup className="my-4">
//           <ListGroup.Item className="text-end">
//             <h4>Total: ${total}</h4>
//           </ListGroup.Item>
//         </ListGroup>
//         <Button
//           variant="success"
//           size="lg"
//           onClick={() => {
//             navigate("/checkout/payment");
//           }}
//           className="w-100"
//         >
//           Proceed to Payment
//         </Button>
//       </Container>
//     </div>
//   );
// }

// export default CartPage;

import React from "react";
import {
  Button,
  Container,
  ListGroup,
  ButtonGroup,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../components/common/NavigationBar";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  reduceFromCart,
  removeFromCart,
} from "../../features/shoppingCart";

function CartPage() {
  const cart = useSelector((store) => store.shoppingCart.cart);
  const dispatch = useDispatch();

  const storeProducts = useSelector((store) => store.catalog.products);

  const navigate = useNavigate();

  let total = 0;
  let totalItems = 0;
  
  const cartContents = cart.map((item, index) => {
    let productName = "null";
    let productBrand = "null";
    let productPrice = -1.0;

    const productInfo = storeProducts.find(
      (itemFromCatalog) => item.itemId === itemFromCatalog.id
    );

    if (productInfo) {
      productName = productInfo.name;
      productBrand = productInfo.brand;
      productPrice = productInfo.price;
    }

    const subTotal = item.amount * productPrice;
    total += subTotal;
    totalItems += item.amount; // Accumulate total items

    const headerLine = `${productBrand}: ${productName}`;
    const productPriceLine = `$${productPrice}`;
    const quantityLine = `QTY: ${item.amount}`;
    const subTotalLine = `Subtotal $${subTotal.toFixed(2)}`;

    // +- handlers
    const handleAdd = () => {
      dispatch(addToCart({ itemId: item.itemId }));
    };

    const handleMinus = () => {
      dispatch(reduceFromCart({ itemId: item.itemId }));
    };

    const handleRemove = () => {
      dispatch(removeFromCart({ itemId: item.itemId }));
    };

    return (
      <ListGroup.Item key={index} className="my-3 p-3 border rounded">
        <Row>
          <Col xs={8}>
            <b>{headerLine}</b>
            <br />
            {productPriceLine}
            <br />
            {quantityLine}
            <br />
            {subTotalLine}
          </Col>
          <Col xs={4} className="text-end">
            <ButtonGroup className="mb-2">
              <Button variant="outline-secondary" onClick={handleMinus}>
                -
              </Button>
              <Button variant="outline-secondary" onClick={handleAdd}>
                +
              </Button>
            </ButtonGroup>
            <br />
            <Button variant="danger" onClick={handleRemove}>
              Remove from Cart
            </Button>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  });

  // Get current date and time
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  return (
    <div>
      <NavigationBar isLoggedIn={false} onLogout={() => {}} />
      <Container>
        <h1 className="my-4">Your Shopping Cart</h1>
        <ListGroup>{cartContents}</ListGroup>

        {/* Total items and current date/time */}
        <div className="mt-4">
          <h5>Total Items: {totalItems}</h5>
          <p>
            Date: {currentDate} <br />
            Time: {currentTime}
          </p>
        </div>

        {/* Total cost */}
        <ListGroup className="my-4">
          <ListGroup.Item className="text-end">
            <h4>Total: ${total.toFixed(2)}</h4>
          </ListGroup.Item>
        </ListGroup>

        <Button
          variant="success"
          size="lg"
          onClick={() => navigate("/checkout/payment")}
          className="w-100"
        >
          Proceed to Payment
        </Button>
      </Container>
    </div>
  );
}

export default CartPage;

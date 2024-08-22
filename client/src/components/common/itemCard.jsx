import { React, useState } from "react";
import { Col, Card, Button } from "react-bootstrap";
import "../../assets/styles/app.css";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import EditProductModal from "./adminComponents/editProductModal";
import "../../assets/styles/itemCard.css"



const ItemCard = ({
  product,
  handleAddStock,
  handleRemoveStock,
  handleAddToCart,
  isAdmin,
  handleUpdateProduct,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  //console.log(product);
  return (
    <Col md={4} key={product.id}>
      <Card className="mb-4">
        <Card.Img variant="top" src={product.image} className="card-img"/>

        {isAdmin && (
          <>
            {" "}
            <Button variant="primary" size="sm" onClick={handleShowModal}>
              Edit <FiEdit />
            </Button>
          </>
        )}

        <Card.Header>{product.brand}</Card.Header>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            ${product.price.toFixed(2)}
          </Card.Subtitle>
          <Card.Text>{product.info}</Card.Text>
          <Card.Text>Remaining Stock: {product.stock}</Card.Text>
          {isAdmin && (
            <>
              <Card.Text>Stock: {product.stock}</Card.Text>
            </>
          )}


          {!isAdmin && (
            <Button onClick={handleAddToCart} variant="primary">
              Add to Cart
            </Button>
          )}

          {isAdmin && (
            <>
              <Button
                className="p-2 ms-auto"
                variant="outline-success"
                onClick={handleAddStock}
              >
                <FaCirclePlus />
              </Button>
              <> </>
              <Button
                className="p-2"
                variant="outline-danger"
                onClick={handleRemoveStock}
              >
                <FaCircleMinus />
              </Button>
            </>
          )}
        </Card.Body>
      </Card>

      {/**This is the modal comppnent*/}
      <EditProductModal
        show={showModal}
        handleClose={handleCloseModal}
        product={product}
        handleUpdateProduct={handleUpdateProduct}
      />
    </Col>
  );
};

export default ItemCard;

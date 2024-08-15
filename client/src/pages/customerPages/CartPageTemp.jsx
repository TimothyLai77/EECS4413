
import React from 'react'
import { Button, Container, ListGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import NavigationBar from '../../components/common/NavigationBar';
import { useSelector } from 'react-redux';
function TempCartPage() {
    const cart = useSelector(store => {
        return store.shoppingCart.cart;
    });

    const storeProducts = useSelector(store => {
        return store.catalog.products
    });
    console.log(storeProducts);

    const navigate = useNavigate();
    console.log(cart);
    
    const cartContents = cart.map((item) => {

        let productName = "null";
        let productBrand = "null";
        let productPrice = -1.0;





        const productInfo = storeProducts.find((itemFromCatalog) => {
            return item.itemId === itemFromCatalog.id;
        });

        if(productInfo){
            productName = productInfo.name;
            productBrand = productInfo.brand;
            productPrice = productInfo.price;
        }

        console.log(productInfo);

        const headerLine = `${productBrand}: ${productName}`
        const productPriceLine = `$${productPrice}` 
        const quantityLine = `QTY: ${item.amount}`

        return (
            <ListGroup.Item>
                <b>{headerLine} </b><br/>
                {productPriceLine} <br/>
                {quantityLine}
            </ListGroup.Item>
        );
    });


    return(    
        <div>  
            <NavigationBar isLoggedIn={false} onLogout={() => {}} />

            <Container>
                <h1 className="my-4">Your Shopping Cart</h1>
                <ListGroup>
                    {cartContents}                    
                </ListGroup>
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

export default TempCartPage
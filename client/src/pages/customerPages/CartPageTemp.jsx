
import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
function TempCartPage() {
    const navigate = useNavigate();
    return(    
    <div>  
        
        <div>TEMP CART PAGE</div>
        <Button onClick={() => {
            navigate("/checkout/payment");
        }}>Payment</Button>

      </div>);


}

export default TempCartPage
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/customerPages/HomePage';
import CatalogPage from './pages/customerPages/CatalogPage'; 
import CartPage from './pages/customerPages/CartPage';
import LoginPage from './pages/customerPages/LoginPage'; 
import CheckoutPaymentInfoEdit from './pages/customerPages/CheckoutPaymentInfoEdit';
import TempLoginPage from "./pages/customerPages/LoginCreatePageTemp"; 
import AdminPage from './pages/adminPages/AdminPage'; 
import AddProduct from './pages/adminPages/AddProduct';
import TempCartPage from './pages/customerPages/CartPageTemp';
//import UpdateProduct from '../src/pages/adminPages/UpdateProduct';
const App = () => (
  <Router>
     <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/cart" element={<TempCartPage />} />
      <Route path="/login" element={<LoginPage />} />
     <Route path="/admin" element={<AdminPage />} />
     <Route path="/admin/addProduct" element={<AddProduct />} />
     <Route path="/checkout/payment" element={<CheckoutPaymentInfoEdit/>}/>
     {/* <Route path="/admin/updateProduct" element={<UpdateProduct />} /> */}
    </Routes>
    </Suspense>
  </Router>
);

export default App;

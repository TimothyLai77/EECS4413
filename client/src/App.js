import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage'; // Create this page similarly
import CartPage from './pages/CartPage'; // Create this page similarly
import LoginPage from './pages/LoginPage'; // Create this page similarly

const App = () => (
  <Router>
     <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
    </Suspense>
  </Router>
);

export default App;

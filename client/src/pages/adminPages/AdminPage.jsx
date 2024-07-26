import React, { useState,Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import { Form, Button, Container, Row, Col } from 'react-bootstrap';
//import getProductCatalog from '../../services/productCatalog';
import AdminNavBar from '../../components/common/adminComponents/adminNavbar';


const AdminPage = () => {
  
  return (
    <div>
      <div className='adminNavbar'>
        <AdminNavBar />
      </div>
        </div>

  );
};

export default AdminPage;

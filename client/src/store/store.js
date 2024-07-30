import { configureStore } from "@reduxjs/toolkit";

import catalogReducer from "../features/catalog";
import productManagementReducer from "../features/productManagement";
import shoppingCartReducer from '../features/shoppingCart'
import userReducer from '../features/userManagement';

export const store = configureStore({
    reducer: {
        catalog: catalogReducer,
        productManagement: productManagementReducer,
        shoppingCart: shoppingCartReducer,
        user: userReducer
    }
})
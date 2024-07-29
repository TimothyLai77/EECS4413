import { configureStore } from "@reduxjs/toolkit";

import catalogReducer from "../features/catalog";
import productManagementReducer from "../features/productManagement";
import shoppingCartReducer from '../features/shoppingCart'

export const store = configureStore({
    reducer: {
        catalog: catalogReducer,
        productManagement: productManagementReducer,
        shoppingCart: shoppingCartReducer
    }
})
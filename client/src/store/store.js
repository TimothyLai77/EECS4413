import { configureStore } from "@reduxjs/toolkit";

import catalogReducer from "../features/catalog";
import productManagementReducer from "../features/productManagement";

export const store = configureStore({
    reducer: {
        catalog: catalogReducer,
        productManagement: productManagementReducer
    }
})
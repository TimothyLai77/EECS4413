import { configureStore } from "@reduxjs/toolkit";

import catalogReducer from "../features/catalog";

export const store = configureStore({
    reducer: {
        catalog: catalogReducer
    }
})
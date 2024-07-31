import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "../store/reduxUtils";
import axios from "axios";

const productManagementSlice = createSlice({
    name: "productManagement",

    // state structure and initial value 
    initialState: {
        products: []
    },
    // Everything to modify the state
    reducers: (create) => ({
        // running async function such as fetching data from the backend 
        createProduct: create.asyncThunk(
            // actual async function 
            async (itemInfo) => {
                await axios.post("/api/items/add", itemInfo);
                // this return value is stored under action.payload
            },
            {
                // runs after asyncThunk is fulfilled, modify the state as needed
                fulfilled: (state, action) => {

                },
                // err handling if async thunk fails
                rejected: () => {
                    console.log("Failed to add");
                }
            }


        ),
        updateProduct: create.asyncThunk(
            // actual async function 
            async (itemInfo) => {
                await axios.put("/api/items/update", itemInfo);
                // this return value is stored under action.payload
                return itemInfo;
            },
            {
                // runs after asyncThunk is fulfilled, modify the state as needed
                fulfilled: (state, action) => {
                    alert("item updated");
                },
                // err handling if async thunk fails
                rejected: () => {
                    alert("item failed to update");
                }
            }


        )
    })
});
//this is to be exported for use by your COMPONENTS to trigger the action
export const { createProduct, updateProduct } = productManagementSlice.actions;
//this is to be exported for use by your STORE to create the 
export default productManagementSlice.reducer;





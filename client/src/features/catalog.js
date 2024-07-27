import { createSlice } from "../store/reduxUtils";
import axios from "axios";

const catalogSlice = createSlice({
    name: "catalog",

    // state structure and initial value 
    initialState: {
        products: []
    },
    // Everything to modify the state
    reducers: (create) => ({
        // running async function such as fetching data from the backend 
        fetchInventory: create.asyncThunk(
            // actual async function 
            async () => {
                let { data } = await axios.get("/api/inventory");
                // this return value is stored under action.payload
                return data.inventory;
            },
            {
                // runs after asyncThunk is fulfilled, modify the state as needed
                fulfilled: (state, action) => {
                    state.products = action.payload;
                },
                // err handling if async thunk fails
                rejected: () => {
                    console.log("Inventory failed to fetch");
                }
            }



        )
    })
});

export const { fetchInventory } = catalogSlice.actions;
export default catalogSlice.reducer;





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
        searchInventory: create.asyncThunk(
            // actual async function 
            async (searchTerm) => {
                let { data } = await axios.post("/api/inventory/search", {searchTerm : searchTerm});
                // this return value is stored under action.payload
                //  FORMAT for page render: 
                // id: 4, name: 'Product 4', price: 14.99, brand:'BRAND',info:"This is the product information", image: image },
                data = data.inventory.map(item => ({
                    id: item.itemId,
                    name: item.Item.name,
                    price: item.Item.price,
                    brand: item.Item.brand,
                    info: item.Item.description,
                    image: item.Item.image,
                    stock: item.quantity,
                }));

                return data;
            },
            {
                // runs after asyncThunk is fulfilled, modify the state as needed
                fulfilled: (state, action) => {

                    state.products = action.payload;
                },
                // err handling if async thunk fails
                rejected: (state, action) => {

                    console.log("search failed");
                }
            }
        ),
        fetchInventory: create.asyncThunk(
            // actual async function 
            async () => {
                let { data } = await axios.get("/api/inventory");
                // this return value is stored under action.payload
                //  FORMAT for page render: 
                // id: 4, name: 'Product 4', price: 14.99, brand:'BRAND',info:"This is the product information", image: image },
                data = data.inventory.map(item => ({
                    id: item.itemId,
                    name: item.Item.name,
                    price: item.Item.price,
                    brand: item.Item.brand,
                    info: item.Item.description,
                    image: item.Item.image,
                    stock: item.quantity,
                }));
                return data;
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
        ),
        inventoryAddStock: create.asyncThunk(async (item) => {
            //item =  {itemID: string, amount: whole number}
            //TODO: create the API for this, and make sure the backend parsing matches what is being sent
            await axios.post("/api/inventory/add", { itemID: item.itemID, amount: item.amount });
            return ({ itemID: item.itemID, amount: item.amount });
        }, {
            // runs after asyncThunk is fulfilled, modify the state as needed
            fulfilled: (state, action) => {
                const item = action.payload;
                //redux only works properly if it actually detects NEW objects, best to create a new array, and do a shallow copy over
                const newState = [...state.products];
                //find the item that had stock added to

                const newStockItem = newState.find(e => e.id === item.itemID);
                if (newStockItem) {
                    //if found (which it should) update the value on the front-end to prevent going to backend to refetch
                    newStockItem.stock += item.amount;
                    //set the new state and let redux trigger any re-renders
                    state.products = newState;
                }

            },
            // err handling if async thunk fails
            rejected: () => {
                console.log("inventory add failed");
            }
        }),

        inventoryDeductStock: create.asyncThunk(async (item) => {
            //item =  {itemID: string, amount: whole number}
            //TODO: create the API for this, and make sure the backend parsing matches what is being sent
            await axios.post("/api/inventory/deduct", { itemID: item.itemID, amount: item.amount });
            return ({ itemID: item.itemID, amount: item.amount });
        }, {
            // runs after asyncThunk is fulfilled, modify the state as needed
            fulfilled: (state, action) => {
                const item = action.payload;
                //redux only works properly if it actually detects NEW objects, best to create a new array, and do a shallow copy over
                const newState = [...state.products];
                //find the item that had stock added to
                const newStockItem = newState.find(e => e.id === item.itemID);
                if (newStockItem) {
                    //if found (which it should) update the value on the front-end to prevent going to backend to refetch
                    newStockItem.stock -= item.amount;
                    //set the new state and let redux trigger any re-renders
                    state.products = newState;
                }

            },
            // err handling if async thunk fails
            rejected: () => {
                console.log("inventory duduction failed");
            }
        })
        
    })
});

export const { fetchInventory, inventoryAddStock, inventoryDeductStock, searchInventory } = catalogSlice.actions;
export default catalogSlice.reducer;





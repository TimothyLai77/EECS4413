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
                //  FORMAT for page render: 
                // id: 4, name: 'Product 4', price: 14.99, brand:'BRAND',info:"This is the product information", image: image },


                // FORMAT RETURNED FROM API:
                // const x = {
                //     "itemId": "item-14allkn0jlz4r6qzb",
                //     "quantity": 7,
                //     "createdAt": "2024-07-27T23:19:17.000Z",
                //     "updatedAt": "2024-07-27T23:19:17.000Z",
                //     "Item": {
                //         "itemId": "item-14allkn0jlz4r6qzb",
                //         "name": "hlkjh",
                //         "price": 7777,
                //         "brand": "h",
                //         "description": "gkjhgkjhgk jhgk jhg",
                //         "image": "jhgkjh",
                //         "createdAt": "2024-07-27T23:19:17.000Z",
                //         "updatedAt": "2024-07-27T23:19:17.000Z"
                //     }
                // },

                data = data.inventory.map(item => ({
                    id: item.itemId,
                    name: item.Item.name,
                    price: item.Item.price,
                    brand: item.Item.brand,
                    info: item.Item.description,
                    image: item.Item.image
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



        )
    })
});

export const { fetchInventory } = catalogSlice.actions;
export default catalogSlice.reducer;





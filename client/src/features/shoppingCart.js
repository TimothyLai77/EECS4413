import { createSlice } from "../store/reduxUtils";
import axios from "axios";

const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState: {
        cart: []
    },
    reducers: (create) => ({
        addToCart: create.reducer((state, action) => {
            const newState = [...state.cart];
            /**
             * example:
             * itemId: 'string'
             * amount: 'number'
             */
            const newCartItem = action.payload;

            const duplicateItemInCart = newState.find(e => e.itemId === newCartItem.itemId);
            if (duplicateItemInCart) {
                duplicateItemInCart.amount += 1;
            }
            else {
                newState.push(newCartItem);
            }
            state.cart = newState;
        }),
        removeFromCart: create.reducer((state, action) => {
            const newState = [...state.cart];
            /**
             * example:
             * itemId: 'string'
             * amount: 'number'
             */
            const newCartItem = action.payload;

            const index = newState.indexOf(e => e.itemId === newCartItem.itemId);
            if (index > -1) {
                newState.splice(index, 1);
                state.cart = newState;
            }
        }),
        clearCart: create.reducer((state) => {
            state.cart = [];
        }),
        checkout: create.asyncThunk(
            // actual async function 
            async (shoppingCart) => {
                await axios.post("/api/inventory/checkout", {shoppingCart: shoppingCart});
                
            },
            {
                // runs after asyncThunk is fulfilled, modify the state as needed
                fulfilled: (state, action) => {
                    state.cart = [];
                    alert("checkout complete");
                },
                // err handling if async thunk fails
                rejected: () => {
                    alert("failed to checkout");
                }
            }



        )
    })

})

export const { addToCart, removeFromCart, clearCart, checkout } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
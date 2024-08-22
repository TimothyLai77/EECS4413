import { createSlice } from "../store/reduxUtils";
import axios from "axios";
import { fetchInventory } from "./catalog";

const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState: {
        cart: [],
        orderSummary: []
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
            state.orderSummary = [];
        }),
        reduceFromCart: create.reducer((state, action) => {
            const newState = [...state.cart];
            /**
             * example:
             * itemId: 'string'
             * amount: 'number'
             */
            const newCartItem = action.payload;

            const duplicateItemInCart = newState.find(e => e.itemId === newCartItem.itemId);
            if (duplicateItemInCart && duplicateItemInCart.amount > 1) {
                duplicateItemInCart.amount -= 1;
            }
            state.cart = newState;
            state.orderSummary = [];
        }),
        removeFromCart: create.reducer((state, action) => {
            const newState = [...state.cart];
            /**
             * example:
             * itemId: 'string'
             * amount: 'number'
             */
            const newCartItem = action.payload;

            const cartItemIds = newState.map(e => e.itemId);

            const index = cartItemIds.indexOf(newCartItem.itemId);
            if (index > -1) {
                newState.splice(index, 1);
                state.cart = newState;
            }
            state.orderSummary = [];
        }),

        clearCart: create.reducer((state) => {
            state.cart = [];
            state.orderSummary = [];
        }),
        purchase: create.asyncThunk(
            // actual async function 
            async (payload, { rejectWithValue, dispatch }) => {
                try {
                    await axios.post("/api/inventory/checkout", payload);
                    dispatch(fetchInventory());
                } catch (error) {
                    rejectWithValue(error.response.data);
                    throw new Error(error.response.data);
                }
            },
            {
                // runs after asyncThunk is fulfilled, modify the state as needed
                fulfilled: (state, action) => {
                    state.orderSummary = [...state.cart];
                    state.cart = [];
                    //alert("checkout complete");
                },
                // err handling if async thunk fails
                rejected: (state, action) => {
                    const errorMsg = action.error.message;
                    throw new Error(errorMsg);

                    //alert("failed to checkout");
                }
            }



        )
    })

})

export const { addToCart, removeFromCart, clearCart, purchase, reduceFromCart } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
import { createSlice } from "../store/reduxUtils";
import axios from "axios";

const userManagementSlice = createSlice({
    name: "userManager",


    initialState: {
        loggedInUser: {
            userId: null,
            email: null,
            firstName: null,
            lastName: null,
            isAdmin: null,
            shippingAddress: null,
            billingAddress: null,
            creditCard: null,
            expiry: null,
            cvv: null
        },
        isLoggedIn : false
        
    },
    reducers: (create) => ({
        createAccount: create.asyncThunk(async (payload) => {
            // const reqBody = {
            //     firstName: payload.firstName,
            //     lastName: payload.lastName,
            //     email: payload.email,
            //     password: payload.password
            // }
            await axios.post("/api/users/create", payload)
        }, {
            fulfilled: () => {
                //alert("Account created");
            },
            rejected: () => {
                //alert("account creation failed");
                throw new Error("Account creation failed");
            }
        }),

        login: create.asyncThunk(async (payload) => {
            const reqBody = {
                email: payload.email,
                password: payload.password
            }
            return (await axios.put("api/users/login", reqBody)).data;
        }, {
            fulfilled: (state, action) => {
                const userData = action.payload;
                state.loggedInUser = userData;
                state.isLoggedIn = true;
            },
            rejected: (state, action) => {
                //alert("account login failed");
                throw new Error("login failed");
            }
        }),

        logout: create.reducer((state) => {
            const newState = {
                userId: null,
                email: null,
                firstName: null,
                lastName: null,
                isAdmin: null
            };
            state.loggedInUser = newState;
            state.isLoggedIn = false; 
        })
    })

});

export const { createAccount, login, logout } = userManagementSlice.actions;
export default userManagementSlice.reducer;
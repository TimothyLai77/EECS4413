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
        isLoggedIn: false,
        isAdmin: false,
        allUsersList: [],

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
        updateAccountDetails: create.asyncThunk(async (payload) => {
            // const reqBody = {
            //     firstName: payload.firstName,
            //     lastName: payload.lastName,
            //     billingAddress: payload.billingAddress,
            //     shippingAddress: payload.billingAddress
            // }
            await axios.put("/api/users/update/information", payload)
        }, {
            fulfilled: () => {
                //alert("Account created");
            },
            rejected: () => {
                //alert("account creation failed");
                throw new Error("Account creation failed");
            }
        }),
        updateCreditCard: create.asyncThunk(async (payload) => {
            // const reqBody = {
            //      creditCard: payload.creditCard
            //      expiry: payload.expiry
            //      cvv: payload.cvv
            // }
            await axios.put("/api/users/update/creditcard", payload)
        }, {
            fulfilled: () => {
                //alert("Account created");
            },
            rejected: () => {
                //alert("account creation failed");
                throw new Error("CC update failed");
            }
        }),

        testSession: create.asyncThunk(async (payload) => {
            return ((await axios.get("/api/users/info")).data);
        },
            {
                fulfilled: (state, action) => {
                    const userData = action.payload;
                    state.loggedInUser = userData;
                    state.isLoggedIn = true;
                },
                rejected: () => {
                    // user session was not stored, don't do anything, user either logins or use guest mode
                }
            }),

        login: create.asyncThunk(async (payload) => {
            const reqBody = {
                email: payload.email,
                password: payload.password
            }
            await axios.put("api/users/login", reqBody)
            return ((await axios.get("/api/users/info")).data);
        }, {
            fulfilled: (state, action) => {
                const userData = action.payload;
                state.loggedInUser = userData;
                state.isLoggedIn = true;
                if (userData.isAdmin && typeof userData.isAdmin === "boolean") {
                    state.isAdmin = userData.isAdmin;
                }
            },
            rejected: (state, action) => {
                //alert("account login failed");
                throw new Error("login failed");
            }
        }),


        logout: create.asyncThunk(async () => {
            await axios.delete("/api/user/logout");
        }, {
            fulfilled: (state, action) => {
                const newState = {
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
                };
                state.loggedInUser = newState;
                state.isLoggedIn = false;
                state.isAdmin = false;
            }
        }),
        getAllUsers: create.asyncThunk(async (payload) => {
            return ((await axios.get("/api/admin/users")).data);
        }, {
            fulfilled: (state, action) => {
                const userList = action.payload;
                state.allUsersList = userList;
            },
            rejected: (state, action) => {
                //alert("account login failed");
                throw new Error("user fetch failed");
            }
        }),
    }),


});

export const {
    createAccount,
    login,
    logout,
    testSession,
    updateAccountDetails,
    updateCreditCard,
    getAllUsers,
    adminUpdateUserCreditCard,
    adminUpdateUserInfo
} = userManagementSlice.actions;
export default userManagementSlice.reducer;
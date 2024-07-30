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
            isAdmin: null
        }
    },



    reducers: (create) => ({
        createAccount: create.asyncThunk(async (payload) => {
            const reqBody = {
                firstName: payload.firstName,
                lastName: payload.lastName,
                email: payload.email,
                password: payload.password
            }
            await axios.post("/api/users/create", reqBody)
        }, {
            fulfilled: () => {
                alert("Account created");
            },
            rejected: () => {
                alert("account creation failed");
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
            },
            rejected: (state, action) => {
                alert("account login failed");
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
        })
    })

});

export const { createAccount, login, logout } = userManagementSlice.actions;
export default userManagementSlice.reducer;
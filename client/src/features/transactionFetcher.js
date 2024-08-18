import { createSlice } from "../store/reduxUtils";
import axios from "axios";

const transactionFetcherSlice = createSlice({
    name: "transactionFetcher",
    initialState: {
        // data [{T1}, {T2}, {T3}, ...];
        /**
         * TX = { 
            transactionId: 
            total: 
            date: 
            userId: 
            }
         */
        transactions: [],
        transactionDetails: [] // don't know if this works....
    }, reducers: (create) => ({

        getAllTransactions: create.asyncThunk(async () => {
            return (await axios.get("/api/admin/transactions/")).data;
        }, {
            fulfilled: (state, action) => {
                const newTransactions = action.payload;
                state.transactions = newTransactions
            },
            rejected: () => {
                throw new Error("could not fetch transactions");
            }
        }),

        getUserTransactions: create.asyncThunk(async (userId) => {
            return (await axios.get("/api/user/transactions/")).data;
        }, {
            fulfilled: (state, action) => {
                const newTransactions = action.payload;
                state.transactions = newTransactions
            },
            rejected: () => {
                throw new Error("could not fetch user transactions");
            }
        }),


        getTransactionDetails: create.asyncThunk(async (transactionId) => {
            return (await axios.post("/api/transactions/details", { transactionId: transactionId })).data;
        }, {
            fulfilled: (state, action) => {
                const transactionDetails = action.payload;
                //console.log(transactionDetails);
                state.transactionDetails = transactionDetails
            },
            rejected: () => {
                throw new Error("could not fetch user transactions");
            }
        }),

    })

});

export const { getAllTransactions, getUserTransactions, getTransactionDetails } = transactionFetcherSlice.actions;
export default transactionFetcherSlice.reducer;
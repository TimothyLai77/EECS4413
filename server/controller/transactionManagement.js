const {
    getUserTransactions,
    getAllTransactions,
    getTransactionDetails
} = require('../modules/TransactionManager');

module.exports = (app) => {
    // get all transactions, admin side
    app.get("/api/admin/transactions/", async (req, res) => {
        try {
            const t = await getAllTransactions();
            res.send(t);
        } catch (error) {
            res.status(500).end("server error");
        }    
    });


    // get all user transactions
    app.get("/api/user/transactions/", async (req, res) => {
        try {
            const request = req.body;
            const userId = request.userId;
            const t = await getUserTransactions(userId);
            res.send(t);
        } catch (error) {
            res.status(500).end("server error");
        }    
    });

    // get the ledger or the details of a transaction
    app.get("/api/transactions/details/", async (req, res) => {
        try {
            const request = req.body;
            const transactionId = request.transactionId;
            const l = await getTransactionDetails(transactionId);
            res.send(l);
        } catch (error) {
            res.status(500).end("server error");
        }    
    });
}
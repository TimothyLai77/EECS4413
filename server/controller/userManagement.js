const { createNewUser, authenticateUserLogin } = require('../modules/UserManager');
module.exports = (app) => {
    app.post("/api/users/create", async (req, res) => {
        try {
            const request = req.body;
            const firstName = request.firstName;
            const lastName = request.lastName;
            const email = request.email;
            const password = request.password;
            const shippingAddress = request.shippingAddr;
            const billingAddress = request.billingAddr;
            const creditCard = request.creditCard;
            const cvv = request.cvv;
            const expiry = request.expiry
            if (!email || !password) throw new Error("Missing info");
            await createNewUser(firstName, lastName, email, password, shippingAddress, billingAddress, creditCard, cvv, expiry);
            res.status(200).end("user created");
        } catch (error) {
            res.status(500).end("internal server error");
        }

    });


    app.put("/api/users/login", async (req, res) => {
        try {
            const request = req.body;
            const email = request.email;
            const password = request.password;
            const user = await authenticateUserLogin(email, password);

            const userData = {
                userId: user.userId,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                isAdmin: user.isAdmin,
                shippingAddress : user.shippingAddress ,
                billingAddress: user.billingAddress  ,
                creditCard: user.creditCardNumber,
                expiry: user.creditCardExpiry,
                cvv: user.cvv,
            }
            res.send(userData);
        } catch (error) {
            console.log(error);
            res.status(500).end("invalid login");
        }
    })


}
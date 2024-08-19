const { createNewUser, authenticateUserLogin, updateUserCreditCard, updateUserInfo, getAllUsers } = require('../modules/UserManager');
const { User } = require('../data/sequelizeModels/User');
const { UnauthorizedError } = require('../modules/errors')
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


    app.put("/api/users/update/creditcard", async (req, res) => {
        try {
            const request = req.body;
            const userId = req.session.user;
            const creditCard = request.creditCard;
            const expiry = request.expiry;
            const cvv = request.cvv;
            await updateUserCreditCard(userId, creditCard, expiry, cvv);
            res.status(200).end("info updated");
        } catch (error) {
            res.status(500).end("could not update");
        }
    });


    app.get("/api/admin/users", async (req, res) => {
        try {
            let users = await getAllUsers();
            users = users.map((user) => {
                return {
                    userId: user.userId,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isAdmin: user.isAdmin,
                    shippingAddress: user.shippingAddress,
                    billingAddress: user.billingAddress,
                    creditCard: user.creditCardNumber,
                    expiry: user.creditCardExpiry,
                    cvv: user.cvv,
                }
            })
            console.log(users);
            res.send(users);
        } catch (error) {
            console.log(error)
            res.status(500).end("could not fetch users");
        }
    });


    app.put("/api/admin/update/user/creditcard", async (req, res) => {
        try {
            const request = req.body;
            const userId = request.userId;
            const creditCard = request.creditCard;
            const expiry = request.expiry;
            const cvv = request.cvv;
            await updateUserCreditCard(userId, creditCard, expiry, cvv);
            res.status(200).end("info updated");
        } catch (error) {
            res.status(500).end("could not update");
        }
    });

    app.put("/api/admin/update/user/information", async (req, res) => {
        try {
            const request = req.body;
            const userId = req.userId;
            const firstName = request.firstName;
            const lastName = request.lastName;
            const billingAddress = request.billingAddress;
            const shippingAddress = request.shippingAddress;
            await updateUserInfo(userId, firstName, lastName, billingAddress, shippingAddress);
            res.status(200).end("info updated")
        } catch (error) {
            res.status(500).end("could not update");
        }
    });


    app.put("/api/users/update/information", async (req, res) => {
        try {
            const request = req.body;
            const userId = req.session.user;
            const firstName = request.firstName;
            const lastName = request.lastName;
            const billingAddress = request.billingAddress;
            const shippingAddress = request.shippingAddress;
            await updateUserInfo(userId, firstName, lastName, billingAddress, shippingAddress);
            res.status(200).end("info updated")
        } catch (error) {
            res.status(500).end("could not update");
        }
    });
    app.get("/api/users/info", async (req, res) => {
        try {
            const userId = req.session.user;
            if (!userId) throw new UnauthorizedError("no user detected in cookie");


            const user = await User.findByPk(userId);
            const userData = {
                userId: user.userId,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                isAdmin: user.isAdmin,
                shippingAddress: user.shippingAddress,
                billingAddress: user.billingAddress,
                creditCard: user.creditCardNumber,
                expiry: user.creditCardExpiry,
                cvv: user.cvv,

            }
            res.send(userData);

        } catch (error) {
            if (error instanceof UnauthorizedError) {
                res.status(403).end("no user cookie found");
            } else {
                res.status(500).end("err")
            }

        }
    });

    app.put("/api/users/login", async (req, res) => {
        try {
            const request = req.body;
            const email = request.email;
            const password = request.password;
            const user = await authenticateUserLogin(email, password);
            req.session.user = user.userId;
            res.cookie()
            res.status(200).end("OK");
        } catch (error) {
            console.log(error);
            res.status(500).end("invalid login");
        }
    })

    app.delete("/api/user/logout", async (req, res) => {
        try {
            await req.session.destroy()
            res.status(200).end("logout sucessful");
        } catch (error) {
            res.status(500).end("can't logout");
        }
    })


}
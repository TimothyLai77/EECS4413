class OutOfStockError extends Error {

};


class EmailAlreadyExistsError extends Error {

}

class UserDoesNotExistError extends Error {

}
exports.OutOfStockError = OutOfStockError;
exports.EmailAlreadyExistsError = EmailAlreadyExistsError;
exports.UserDoesNotExistError = UserDoesNotExistError;
class OutOfStockError extends Error {

};

class InvalidOperationError extends Error {

}


class EmailAlreadyExistsError extends Error {

}

class UserDoesNotExistError extends Error {

}


class UnauthorizedError extends Error {

}
exports.OutOfStockError = OutOfStockError;
exports.EmailAlreadyExistsError = EmailAlreadyExistsError;
exports.UserDoesNotExistError = UserDoesNotExistError;
exports.InvalidOperationError = InvalidOperationError;
exports.UnauthorizedError = UnauthorizedError;
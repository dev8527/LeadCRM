// ErrorHandler.js
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        console.log(message, statusCode);
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ErrorHandler;  // Default export

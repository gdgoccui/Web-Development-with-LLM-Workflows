class ApiError extends Error {
    constructor (statuscode, message, errors=[]) {
        super(message);
        this.statuscode = statuscode;
        this.success = false;
        this.errors = errors;
    }
}

export default ApiError;
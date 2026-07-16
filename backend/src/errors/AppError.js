// status codes 
// 200: ok/everything worked
// 201: successfully created something
// 204: success but nothing to send back, ex: deletion
// 400: bad request, usually middlewares send this, basically client's mistake
// 401: unauthorized(not logged in) 
// 403: forbidden(logged in but not allowed)
// 404: doesn't exist
// 500: Server failed

class AppError extends Error{
constructor(statuscode, message){
    super(message);
    this.statusCode = statuscode;
    this.status = `${statuscode}`.startsWith("4")? "fail":"error";

    Error.captureStackTrace(this, this.constructor);
}
}

module.exports = AppError;
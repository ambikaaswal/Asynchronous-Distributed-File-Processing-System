const AppError = require("../errors/AppError");

//ek function h jo ek middleware return krta h
const asyncHandler = (fn)=>(req,res,next)=>
    Promise.resolve(fn(req, res,next)).catch(next);
   

module.exports = asyncHandler;
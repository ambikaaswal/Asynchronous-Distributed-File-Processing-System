// Global Error Handler

const errorHandler = (err, req, res, next)=>{
    res.status(err.statusCode || 500).json({
        success: false,
        status: err.status || "error",
        message: err.message || "Internal Server Error"
    });
};

module.exports = errorHandler;
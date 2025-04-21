const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500; // Set default to 500 if status code is not set
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack // Hide stack trace in production
    });
}

export default errorHandler;
/**
 * Global Error Handler Middleware
 * Handles all unhandled errors in the application
 */
const errorHandler = (error, req, res, next) => {
    console.error('Unhandled error:', error);
    
    // Default error
    let statusCode = 500;
    let message = 'Internal server error';

    // Mongoose validation error
    if (error.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(error.errors).map(val => val.message).join(', ');
    }

    // Mongoose duplicate key error
    if (error.code === 11000) {
        statusCode = 400;
        message = 'Duplicate field value entered';
    }

    // Mongoose cast error (invalid ObjectId)
    if (error.name === 'CastError') {
        statusCode = 400;
        message = 'Invalid ID format';
    }

    res.status(statusCode).json({
        success: false,
        message: message,
        error: process.env.NODE_ENV === 'production' ? 'Something went wrong' : error.message
    });
};

module.exports = errorHandler;

const express = require('express');

// Load environment variables
require('dotenv').config();

// Import modules
const Database = require('./config/database');
const corsMiddleware = require('./middleware/cors');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const taskRoutes = require('./routes/taskRoutes');

const app = express();

/**
 * Initialize Database Connection
 */
Database.connect();

/**
 * Middleware Setup
 */
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(corsMiddleware);

/**
 * Routes Setup
 */
app.use('/tasks', taskRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Task Management API',
        version: '1.0.0',
        endpoints: {
            tasks: '/tasks'
        }
    });
});

/**
 * Error Handling
 */
// 404 handler for undefined routes
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        availableRoutes: [
            'GET /',
            'GET /tasks',
            'POST /tasks',
            'GET /tasks/:id',
            'PUT /tasks/:id',
            'DELETE /tasks/:id'
        ]
    });
});

// Global error handler
app.use(errorHandler);

/**
 * Graceful Shutdown
 */
process.on('SIGTERM', async () => {
    console.log('SIGTERM received, shutting down gracefully...');
    await Database.disconnect();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('SIGINT received, shutting down gracefully...');
    await Database.disconnect();
    process.exit(0);
});

module.exports = app;

const mongoose = require('mongoose');

/**
 * Simple Database Connection
 */
class Database {
    static async connect() {
        try {
            const MONGODB_URI = 'mongodb://localhost:27017/task';
//
            await mongoose.connect(MONGODB_URI);
            console.log("MongoDB connected successfully");
            
        } catch (error) {
            console.error("MongoDB connection error:", error.message);
            process.exit(1);
        }
    }

    static async disconnect() {
        try {
            await mongoose.disconnect();
            console.log('MongoDB disconnected');
        } catch (error) {
            console.error('Error disconnecting from MongoDB:', error);
        }
    }
}

module.exports = Database;

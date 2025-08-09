const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters'],
        default: ''
    },
    dueDate: {
        type: Date,
    },
    status: {
        type: String,
        enum: {
            values: ['pending', 'completed'],
            message: '{VALUE} is not a valid status'
        },
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Pre-save middleware to update the updatedAt field
taskSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

// Pre-update middleware to update the updatedAt field
taskSchema.pre('findOneAndUpdate', function(next) {
    this.set({ updatedAt: new Date() });
    next();
});

taskSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

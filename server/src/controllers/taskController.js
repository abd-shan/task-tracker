const Task = require('../models/Task');
const mongoose = require('mongoose');

/**
 * Task Controller
 */
class TaskController {
    
    /**
     * Get all tasks
     * GET /tasks
     */
    static async getAllTasks(req, res) {
        try {
            const tasks = await Task.find().sort({ createdAt: -1 });
            res.status(200).json({
                success: true,
                data: tasks,
                count: tasks.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching tasks',
                error: error.message
            });
        }
    }

    /**
     * Create a new task
     * POST /tasks
     */
    static async createTask(req, res) {
        try {
            const { title, description, dueDate, status } = req.body;
            
            // Validation
            if (!title) {
                return res.status(400).json({
                    success: false,
                    message: 'Title is required'
                });
            }

            const newTask = new Task({
                title,
                description: description || '',
                dueDate: dueDate ? new Date(dueDate) : null,
                status: 'pending',
                createdAt: new Date()
            });

            const savedTask = await newTask.save();
            res.status(201).json({
                success: true,
                message: 'Task created successfully',
                data: savedTask
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error creating task',
                error: error.message
            });
        }
    }

    // Update a task
    static async updateTask(req, res) {
        try {
            const { id } = req.params;
            const updates = req.body;

            // Validate MongoDB ObjectId
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid task ID'
                });
            }

            // If dueDate is being updated, convert to Date
            if (updates.dueDate) {
                updates.dueDate = new Date(updates.dueDate);
            }

            const updatedTask = await Task.findByIdAndUpdate(
                id,
                updates,
                { new: true, runValidators: true }
            );

            if (!updatedTask) {
                return res.status(404).json({
                    success: false,
                    message: 'Task not found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Task updated successfully',
                data: updatedTask
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error updating task',
                error: error.message
            });
        }
    }

    static async markAtComplete(req, res) {
        try {
            const {id} =req.params;

            if(!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid task ID'
                })
            }

            const updateTask = await Task.findByIdAndUpdate(
                id,
                {status:'completed'},
                {new:true}
            )
            if (!updateTask) {
                return res.status(404).json({
                    success: false,
                    message: 'Task not found'
                })
            }

            res.status(200).json({
                success: true,
                message: 'Task updated successfully',
                data: updateTask
            })

        }
        catch (error){
            res.status(500).json({
                success: false,
                message: 'Error marking task as completed',
                error: error.message
            });
        }
    }

    /**
     * Delete a task
     * DELETE /tasks/:id
     */
    static async deleteTask(req, res) {
        try {
            const { id } = req.params;

            // Validate MongoDB ObjectId
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid task ID'
                });
            }

            const deletedTask = await Task.findByIdAndDelete(id);

            if (!deletedTask) {
                return res.status(404).json({
                    success: false,
                    message: 'Task not found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Task deleted successfully',
                data: deletedTask
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting task',
                error: error.message
            });
        }
    }

    /**
     * Get task by ID
     * GET /tasks/:id
     */
    static async getTaskById(req, res) {
        try {
            const { id } = req.params;

            // Validate MongoDB ObjectId
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid task ID'
                });
            }

            const task = await Task.findById(id);

            if (!task) {
                return res.status(404).json({
                    success: false,
                    message: 'Task not found'
                });
            }

            res.status(200).json({
                success: true,
                data: task
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching task',
                error: error.message
            });
        }
    }
}

module.exports = TaskController;

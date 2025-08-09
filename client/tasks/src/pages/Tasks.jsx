import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, completeTask, deleteTask, getTasks, resetStatus } from "../services/TaskSlice.js";
import './task.css';
import DeleteTask from "../components/modal/delete/DeleteTask.jsx";
import AddTaskModal from "../components/modal/addTask/AddTask.jsx";
import {toast} from "react-toastify";

const Tasks = () => {
    const dispatch = useDispatch();
    const { tasks, loading, error, success } = useSelector(state => state.tasks);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: ''
    });

    const [formError, setFormError] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    const tasksData = tasks && Array.isArray(tasks) ? tasks : [];

    useEffect(() => {
        dispatch(getTasks());
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            dispatch(resetStatus());
            if (showAddModal) {
                setShowAddModal(false);
                setFormData({ title: '', description: '', dueDate: '' });
            }
        }
    }, [success, dispatch, showAddModal]);

    const handleAddClick = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
        setFormData({ title: '', description: '', dueDate: '' });
        setFormError('');
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            setFormError('Title is required');
            return;
        }

        setFormError('');
        dispatch(addTask(formData));
        toast.success('task has added successfully')
    };

    const handleDeleteClick = (id) => {
        setTaskToDelete(id);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        if (taskToDelete) {
            dispatch(deleteTask(taskToDelete));
            toast.success('task has  deleted successfully')
        }
        setShowDeleteModal(false);
        setTaskToDelete(null);
    };

    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
        setTaskToDelete(null);
    };

    const handleComplete = (id) => {
        dispatch(completeTask(id));
        toast.success('task has completed successfully')
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'No due date';
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="tasks-container">
            <div className="header-section">
                <h1 className="tasks-header">Task Tracker</h1>
                <button
                    className="add-task-btn"
                    onClick={handleAddClick}
                >
                    + Add Task
                </button>
            </div>

            {error && (
                <div className="error-alert">
                    <p>{error}</p>
                </div>
            )}

            {loading && tasksData.length === 0 && (
                <p className="loading-message">Loading tasks...</p>
            )}

            <div className="tasks-list">
                {tasksData.map(task => (
                    <div
                        key={task._id}
                        className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}
                    >
                        <div className="task-content">
                            <h3 className={task.status === 'completed' ? 'completed-title' : ''}>
                                {task.title}
                            </h3>
                            {task.description && (
                                <p className="task-description">{task.description}</p>
                            )}
                            <div className="task-meta">
                                <p><strong>Due:</strong> {formatDate(task.dueDate)}</p>
                                <p>
                                    <strong>Status:</strong>
                                    <span className={`status-${task.status}`}>
                                        {task.status}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="task-actions">
                            {task.status !== 'completed' && (
                                <button
                                    onClick={() => handleComplete(task._id)}
                                    className="complete-button"
                                    disabled={loading}
                                >
                                    Complete
                                </button>
                            )}
                            <button
                                onClick={() => handleDeleteClick(task._id)}
                                className="delete-button"
                                disabled={loading}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}

                {tasksData.length === 0 && !loading && (
                    <div className="no-tasks-card">
                        <p className="no-tasks-text">No tasks found</p>
                        <p>Click the "Add Task" button to create your first task</p>
                        <button
                            className="add-task-btn"
                            onClick={handleAddClick}
                        >
                            + Add Your First Task
                        </button>
                    </div>
                )}
            </div>

            <AddTaskModal
                isOpen={showAddModal}
                onClose={handleCloseAddModal}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                formError={formError}
                loading={loading}
            />

            {showDeleteModal && (
                <DeleteTask
                    onCancel={handleDeleteCancel}
                    onConfirm={handleDeleteConfirm}
                />
            )}
        </div>
    );
};

export default Tasks;

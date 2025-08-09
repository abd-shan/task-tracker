import React, { useEffect } from 'react';

const AddTaskModal = ({
                          isOpen,
                          onClose,
                          formData,
                          handleChange,
                          handleSubmit,
                          formError,
                          loading
                      }) => {
    // close on ESC
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
        }

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    // close on click outside
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className={`modal-backdrop ${isOpen ? 'open' : ''}`}
            onClick={handleBackdropClick}
            aria-hidden={!isOpen}
        >
            <div
                className="modal-box"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                onClick={(e) => e.stopPropagation()} //prevent close onclick inside
            >
                <div className="modal-header">
                    <h3 id="modal-title">Add New Task</h3>
                    <button
                        className="close-btn"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        &times;
                    </button>
                </div>

                {formError && (
                    <div className="form-error" role="alert">
                        {formError}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title*</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Task title"
                            aria-required="true"
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Task description"
                            rows="3"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="dueDate">Due Date</label>
                        <input
                            type="datetime-local"
                            id="dueDate"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="modal-actions">
                        <button
                            type="button"
                            className="modal-btn cancel"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="modal-btn submit"
                            disabled={loading}
                        >
                            {loading ? 'Adding...' : 'Add Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTaskModal;

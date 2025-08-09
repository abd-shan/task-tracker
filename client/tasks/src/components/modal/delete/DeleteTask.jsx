import React from 'react';
import './deleteTask.css'
const DeleteTask = ({onCancel,onConfirm}) => {
    return (
        <div className="confirm-modal-backdrop">
            <div className="confirm-modal-box">
                <h3 className="confirm-modal-title">delete task</h3>
                <p className="confirm-modal-message">are you sure to delete</p>
                <div className="confirm-modal-actions">
                    <button className="confirm-modal-btn cancel" onClick={onCancel}>cancel</button>
                    <button className="confirm-modal-btn confirm" onClick={onConfirm}>confirm</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteTask;

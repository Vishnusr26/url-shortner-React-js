import React from 'react';
// import './DeleteUrlPopup.css'; // Optional: For styling the popup

function DeleteUrlPopup({ show, urlTitle, onDeleteConfirm, onCancel }) {
  if (!show) {
    return null;
  }

  return (
    <div className="delete-popup-overlay position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50">
    <div className="delete-popup bg-white p-4 rounded shadow">
      <h3 className="mb-3">Delete URL</h3>
      <p>Are you sure you want to delete the URL titled "<strong>{urlTitle}</strong>"?</p>
      <div className="delete-popup-buttons d-flex justify-content-end mt-4">
        <button onClick={onDeleteConfirm} className="btn btn-danger me-2">
          Yes, Delete
        </button>
        <button onClick={onCancel} className="btn btn-secondary">
          Cancel
        </button>
      </div>
    </div>
  </div>
  );
}

export default DeleteUrlPopup;

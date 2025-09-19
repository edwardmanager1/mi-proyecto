import React from "react";
import "./ErrorModal.css";

const ErrorModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Error de autenticación</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="error-icon">⚠️</div>
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button className="modal-btn" onClick={onClose}>
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;

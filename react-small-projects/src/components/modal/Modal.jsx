// src/components/modal/Modal.jsx
import React from "react";
import "./Modal.css"; // Make sure to create a corresponding CSS file for styling

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

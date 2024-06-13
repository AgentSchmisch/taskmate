// components/Modal.js
import React from 'react';
import styles from './Modal.module.css'; // We will create this CSS file later

const Modal = ({ show, onClose, children }) => {
    if (!show) {
        return null;
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose}>
                    ×
                </button>
                <div className={styles.modalContent}>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
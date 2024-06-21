// components/Modal.js
import React from 'react';
import styles from './Modal.module.css'; // We will create this CSS file later
import { useEffect } from 'react';

const Modal = ({ show, onClose, changed, children, type }) => {


    if (!show) {
        return null;
    }

    if (type === "note") {
        return (
            <div className={styles.modalOverlay}>
                <div className={styles.modalNote}>
                    <div className='flex flex-row justify-center'>
                        <div className={`h-2 w-full mr-5 rounded full ${changed && show ? "bg-red-700" : "bg-green-500"}`}></div>

                        <button className={styles.closeButton} onClick={onClose}>
                            ×
                        </button>
                    </div>
                    <div className={styles.modalContent}>{children}</div>
                </div>
            </div>
        );
    }

    if (type === "task") {
        return (
            <div className={styles.modalOverlay}>
                <div className={styles.modal}>
                    <div className='flex flex-row justify-center'>
                        <div className={`h-2 w-full mr-5 rounded full ${changed && show ? "bg-red-700" : "bg-green-500"}`}></div>

                        <button className={styles.closeButton} onClick={onClose}>
                            ×
                        </button>
                    </div>
                    <div className={styles.modalContent}>{children}</div>
                </div>
            </div>
        );
    }

};

export default Modal;
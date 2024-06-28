// components/Modal.js
import React from 'react';
import styles from './Modal.module.css';

// this component is the basic styling for all the Modals in the app
// {children} holds all the contents that should be in the Modal
// all the other components hold the states for the modal as well as the type of modal it is 
const Modal = ({ show, onClose, changed, children, type }) => {

    // if the param show is set to false the modal will return null
    if (!show) {
        return null;
    }

    // the note modal is wider and therefore required a different styling
    if (type === "note") {
        return (
            <div className={styles.modalOverlay}>
                <div className={styles.modalNote}>
                    <div className='flex flex-row justify-center'>
                        {
                        // this bar shows whether the content of the Modal was changed by the user
                        }
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
    // the task modal has a different aspect ratio compared to the note Modal
    if (type === "task") {
        return (
            <div className={styles.modalOverlay}>
                <div className={styles.modal}>
                    <div className='flex flex-row justify-center'>
                        {
                        // this bar shows whether the content of the Modal was changed by the user
                        }
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
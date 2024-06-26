// this is already a client component, even though there is no "use client"
// this is because, it gets inherited from the parent components

import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import Modal from "@/app/components/Modal.jsx";

export default function NewNote({createNote, handleOpenModal, handleCloseModal, showModal, userid}){
    // setting the opening a 
    function handleButtonPress() {
        handleOpenModal("new")
    }
    // getting the current date and reformatting it to be used in a database query
    function getDate(){
        const date = new Date()
        const year = date.getFullYear()
        // if the length if the date is 1 add a 0 to the front (e.g. Month: may -> 05)
        const month = String(date.getMonth()+1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        // the final format is yyyy-MM-dd
        return `${year}-${month}-${day}`
    }

    // useState hook for the Data that is entered by the user
    const [formData, setFormData] = useState({
        name: '',
        content: '',
        creationDate: getDate()
    });

    function handleSubmit(event) {
        // prevent the browser from redirecting -> default function upon hitting a button of type "submit"
        event.preventDefault();
        // call the createNote function to create a note and reset the formdata afterwards
        createNote(formData, userid).then(() => {
            setFormData({
                name: '',
                content: '',
                creationDate: getDate()
            })
        })
        // close the modal again
        handleCloseModal();
    }

    // push the formdata to the hook
    // this function is called by all the onChange functions of the html elements
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

    };


    return (
        <>
        <button type="button" className='w-full' onClick={handleButtonPress}>
            <div className='border-dashed border-2 border-white rounded-lg'>
            <FontAwesomeIcon className="p-12 h-12" icon={faCirclePlus} />
            </div>
        </button>
        {/* content for the Note's Modal */}
        <Modal type={"note"} show={showModal} onClose={handleCloseModal}>

            <form onSubmit={handleSubmit} className="h-full space-y-4 p-6 bg-white rounded-lg shadow-md font-sans">
            <div className="flex flex-col">
                        <label htmlFor="name" className="mb-2 font-semibold text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={handleChange}
                            required
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="content" className="mb-2 font-semibold text-gray-700">Content</label>
                        <textarea
                            id="content"
                            name="content"
                            onChange={handleChange}
                            className="h-22 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
                
                </form>
        </Modal>

        </>
    )
}
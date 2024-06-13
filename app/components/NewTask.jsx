import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import Modal from "./Modal.jsx";

export default function NewTask({createTask, showModal, handleOpenModal,handleCloseModal, userid}) {
    //create a useState for the whole form
    
    
    function handleButtonPress() {
        handleOpenModal()
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        handleCloseModal();
        createTask(formData, userid)
    }

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        priority: '',
        duedate: '',
        description: '',
        status: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    function handleDelete() {
        handleCloseModal();
        deleteTask(formData, userid)
    }

    return (

        <>
        <button type="button" onClick={handleButtonPress}>
            <div className='border-dashed border-2 border-white rounded-lg'>
                <FontAwesomeIcon className="p-12 h-12" icon={faCirclePlus} />
            </div>
        </button>
        <Modal show={showModal} onClose={handleCloseModal}>
        <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-md font-sans">
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
                <label htmlFor="priority" className="mb-2 font-semibold text-gray-700">Priority</label>
                <select
                    id="priority"
                    name="priority"
                    onChange={handleChange}
                    required
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <div className="flex flex-col">
                <label htmlFor="dueDate" className="mb-2 font-semibold text-gray-700">Due Date</label>
                <input
                    type="date"
                    id="dueDate"
                    name="duedate"
                    onChange={handleChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="status" className="mb-2 font-semibold text-gray-700">Status</label>
                <select
                    id="status"
                    name="status"
                    onChange={handleChange}
                    required
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select status</option>
                    <option value="not started">Not Started</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <div className="flex flex-col">
                <label htmlFor="status" className="mb-2 font-semibold text-gray-700">Description</label>
                <textarea
                    id="description"
                    name="description"
                    onChange={handleChange}
                    required
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                </textarea>
            </div>
            <button type="button" onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                Delete
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Submit
            </button>
        </form>
    </Modal>
</>
    )
}
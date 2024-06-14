"use client"

import Modal from "./Modal.jsx";
import { useState, useEffect } from "react";

export default function Task({ task, showModal, handleOpenModal, handleCloseModal, updateTask, deleteTask, userid }) {


    function handleButtonPress() {
        handleOpenModal(task.id)
    }

    function handleSubmit(event) {
        event.preventDefault();
        handleCloseModal();
        updateTask(formData, userid).then(() => {
            setChanged(false)
        })
    }

    function reformatDate(dateString) {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        const formattedDate = `${day}.${month}.${year}`;
        return formattedDate;
    }


    const [formData, setFormData] = useState({
        id: task.id || '',
        name: task.name || '',
        priority: task.priority || '',
        duedate: task.duedate || '',
        description: task.description || '',
        status: task.status || ''
    });

    const [changed, setChanged] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        setChanged(true)
    };



    function handleDelete() {
        handleCloseModal();
        deleteTask(formData, userid)
    }

    return (
        <>
            <button className={`border-solid border-2 border-white rounded-lg ${task.priority==="low"?"bg-green-700":""} ${task.priority==="medium"?"bg-yellow-700":""} ${task.priority==="high"?"bg-red-700":""}`} onClick={handleButtonPress}>
                <div className=' flex flex-col m-12'>
                    <p className="font-bold	">{task.name}</p>
                    <p>{reformatDate(formData.duedate)}</p>
                </div>
            </button>
            <Modal show={showModal} onClose={handleCloseModal} changed={changed}>
                <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-md font-sans">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-2 font-semibold text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
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
                            value={formData.priority}
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
                            value={formData.duedate.split('T')[0]}
                            onChange={handleChange}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="status" className="mb-2 font-semibold text-gray-700">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
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
                            value={formData.description}
                            onChange={handleChange}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                        </textarea>
                    </div>
                    <div className="flex flex-row justify-between">
                        <button type="button" onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                            Delete
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Save
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    )
}
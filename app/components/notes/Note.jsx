import Modal from "../Modal";
import { useState, useEffect } from "react";

export default function Task({ note, showModal, handleOpenModal, handleCloseModal, updateNote, deleteNote, userid }) {

    // this function reformats the date into the form dd.MM.yyy
    function reformatDate(dateString) {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        const formattedDate = `${day}.${month}.${year}`;
        return formattedDate;
    }

    // this function cuts the preview of the note down to 100 characters
    // this is done, to avoid a large amount of text being displayed in the preview
    function truncateNote(note) {
        const maxLength = 100;

        if (!note)
            return

        if (note.length > maxLength) {
            // Find the last space within the maxLength
            const truncated = note.slice(0, maxLength);
            const lastSpaceIndex = truncated.lastIndexOf(' ');
            if (lastSpaceIndex > 0) {
                return truncated.slice(0, lastSpaceIndex) + '...';
            }
            return truncated + '...';
        }
        return note;
    }

    // this function is called upon clicking on a note
    // it openes the Modal with the corresponding note id
    function handleButtonPress() {
        handleOpenModal(note.id)
    }

    // this function is called upon clicking the update button
    function handleSubmit(event) {
        event.preventDefault();
        handleCloseModal();
        updateNote(formData, userid).then(() => {
            setChanged(false)
        })
    }

    const [formData, setFormData] = useState({
        id: note.id || '',
        name: note.name || '',
        content: note.content || '',
        creationDate: note.creationDate || ''
    });

    const [changed, setChanged] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        e.target.style.height = 'auto';
        e.target.style.height = (e.target.scrollHeight) + 'px';
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        setChanged(true)
    };
    function handleDelete() {
        handleCloseModal();
        deleteNote(formData, userid)
    }

    return (
        <>
        {/* this is the basic display of the Note Card */}
            <button onClick={handleButtonPress} className='border-2 border-white rounded-lg'>
                <div className='flex flex-col md:flex-row justify-between '>
                    <h1 className='p-6'>{note.name}</h1>
                    <p className='p-6'>{truncateNote(note.content)}</p>
                    <p className='p-6'>{reformatDate(note.creationDate)}</p>
                </div>
            </button>

            <Modal show={showModal} changed={changed} onClose={handleCloseModal} type={"note"}>
            {/* here are the contents of the Modals */}
                <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-md font-sans h-full">
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
                        <label htmlFor="content" className="mb-2 font-semibold text-gray-700">Content</label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-64"
                        />

                    </div>
                    <div className="flex justify-between flex-row">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
                        <button type="button" onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                    </div>
                </form>
            </Modal>
        </>
    )
}
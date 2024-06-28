"use client"
import { RedirectToSignIn, useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import NewNote from '@/app/components/notes/NewNote.jsx';
import Note from "@/app/components/notes/Note.jsx";

export default function PageContent({ getNotesByUser, createNote, updateNote, deleteNote }) {

    // all the hooks are being placed at the beginning
    // Nextjs requires the page to have the same hooks being called in the same order on every loading of the page
    // conditional hooks are not allowed

    const { user, isLoaded, isSignedIn } = useUser()
    const [visibleModal, setShowModal] = useState(false)

    const [notes, setNotes] = useState([])
    const [error, setError] = useState(null)
    const [reload, setReload] = useState(false)

    useEffect(() => {
        loadData()
    }, []);

    useEffect(() => {
        loadData();
        setReload(false)
    }, [reload])

    useEffect(() => {
        loadData()
    }, [isSignedIn])

    // if the user is not signed in, redirect to a dedicated login page
    if (!isSignedIn || !isLoaded) {
        return <RedirectToSignIn />
    }

    // this function will close the modal and reload the data on the page with the useEffect hook
    const handleCLoseModal = () => {
        setShowModal(false)
        setReload(true)
    }

    function loadData() {
        // this function is called on every change of the content of the page, deleting, editing, loading,...
        if (!user) {
            return
        }
        getNotesByUser(user.id)
            .then((notes) => setNotes(notes))
            .catch((error) => {
                console.log(error.sqlMessage)
                setError("Error loading notes")
            })
    }

    return (
        // this is the page content
        <>
            <div className='flex flex-col gap-4 w-full'>
                <p className="text-red-700 font-bold bg-white rounded-md w-1/5 flex justify-center">{error}</p>
                <div className='w-full'>
                    <NewNote createNote={createNote} handleOpenModal={setShowModal} handleCloseModal={handleCLoseModal} showModal={visibleModal === "new"} userid={user.id} />
                </div>
                <div className='flex flex-col w-full gap-4'>
                    {
                        notes.length > 0 &&
                        notes.map((note) => (
                            <Note key={note.id} note={note} showModal={visibleModal === note.id} handleOpenModal={setShowModal} handleCloseModal={handleCLoseModal} updateNote={updateNote} deleteNote={deleteNote} userid={user.id} />
                        ))
                    }
                </div>
            </div>
        </>
    );
};


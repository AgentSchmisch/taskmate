"use server"
import { Note } from '../services/database/model.js';

const getNotes = () => {
    // get all the Notes from the database
    try {
        return Note.findAll();
    }
    catch (error) {
        reject(error)
    }

};

async function getNotesByUser(userid) {
    // get all the Notes for the user from the database
    try {

        let notes = JSON.parse(JSON.stringify(await Note.findAll({
            where: { userid: userid },
        })))

        return notes
    }
    catch (error) {
        reject(error)
    }
};

async function createNote(userdata, userid) {
    // create the Note in the database
    // the data for the note is in the userdata parameter
    // the userid is passed seperately
    try {
        let note = JSON.parse(JSON.stringify(Note.create({
            userid: userid,
            name: userdata.name,
            content: userdata.content,
            creationDate: userdata.creationDate
        })))
        return note
    }
    catch (error) {
        reject(error)
    }
}

async function updateNote(userdata, userid) {
    // update the Note in the database
    // the data for the note is in the userdata parameter
    // the id of the note is used to find it in the database
    // the userid is passed seperately again
    try {
        return Note.update({
            name: userdata.name,
            content: userdata.content,
        }, {
            where: {
                id: userdata.id,
                userid: userid
            }
        });
    }
    catch (error) {
        reject(error)
    }
}

async function deleteNote(userdata, userid) {
    // this function is used to delete a note from the database
    // I am using the userid as well as the notes id to make sure that the correct note is deleted
    try {
        return Note.destroy({
            where: {
                id: userdata.id,
                userid: userid
            }
        });
    }
    catch (error) {
        reject(error)
    }
}

// finally exporting all the functions 
export { getNotes, getNotesByUser, createNote, updateNote, deleteNote };
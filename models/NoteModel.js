"use server"
import { Note } from '../services/database/model.js';

const getNotes = () => {
    try{
        return Note.findAll();
}
catch(error){
    reject(error)
}

};

async function getNotesByUser(userid) {
    try{

        let notes = JSON.parse(JSON.stringify(await Note.findAll({
            where: { userid: userid },
        })))
        
        return notes
    }
    catch(error){
        reject(error)
    }
};

async function createNote(userdata, userid) {
    try{

        let note = JSON.parse(JSON.stringify(Note.create({
            userid: userid,
            name: userdata.name,
            content: userdata.content,
            creationDate:userdata.creationDate
        })))
        return note
    }
    catch(error){
        reject(error)
    }
}

async function updateNote(userdata, userid) {
    try {
    return Note.update({
        name: userdata.name,
        content: userdata.content,
    }, {
        where: {
            id: userdata.id,
            userid: userid
        }
    });}
    catch(error){
        reject(error)
    }
}

async function deleteNote(userdata, userid) {
    try{

        return Note.destroy({
            where: {
                id: userdata.id,
                userid: userid
            }
        });
    }
    catch(error){
        reject(error)
    }
}

export { getNotes, getNotesByUser, createNote, updateNote, deleteNote };
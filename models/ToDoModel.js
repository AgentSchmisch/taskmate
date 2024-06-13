"use server"

import { Todo } from '../services/database/model.js';

const getTodos = () => {
    return Todo.findAll();
};

async function getTodosByUser(userid) {
    let tasks = JSON.parse(JSON.stringify(await Todo.findAll({
        where: { userid: userid },
    })))

    return tasks
};

async function createTodo (userdata, userid) {
    let task = JSON.parse(JSON.stringify(Todo.create({
        userid: userid,
        name: userdata.name,
        priority: userdata.priority,
        description: userdata.description,
        duedate: userdata.duedate,
        status: userdata.status,
    })))

    return task
};

async function updateTodo(userdata,userid){
    return Todo.update({
        name: userdata.name,
        priority: userdata.priority,
        description: userdata.description,
        duedate: userdata.duedate,
        status: userdata.status,
        
    },{where:{userid: userid, id:userdata.id}})
}

async function deleteTodo(userdata, userid){
    return Todo.destroy({where:{id:userdata.id, userid:userid}})
}


export { getTodos, getTodosByUser, createTodo, updateTodo, deleteTodo }
"use server"

import { Todo } from '../services/database/model.js';
import { Op } from 'sequelize';

const getTodos = () => {
    return Todo.findAll();
};

async function getTodosByUser(userid) {
    try {
        let tasks = JSON.parse(JSON.stringify(await Todo.findAll({
            where: { userid: userid, status: { [Op.not]: "completed" } },
        })))
        return tasks
    } catch (error) {
        reject(error)
    }

};

async function getTodosForToday(userid) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    var yyyy = today.getFullYear();

    // Start of today
    var startOfToday = `${yyyy}-${mm}-${dd}T00:00:00Z`;
    // End of today
    var endOfToday = `${yyyy}-${mm}-${dd}T23:59:59Z`;

    try {
            // Fetch tasks for today
    let tasks = await Todo.findAll({
        where: {
            userid: userid,
            duedate: {
                [Op.between]: [startOfToday, endOfToday]
            }
        }
    });

    // Convert tasks to plain JSON
    tasks = JSON.parse(JSON.stringify(tasks));
    return tasks;
    } catch (error) {
        reject(error)
    }

}

async function createTodo(userdata, userid) {

    try {
        let task = JSON.parse(JSON.stringify(Todo.create({
            userid: userid,
            name: userdata.name,
            priority: userdata.priority,
            description: userdata.description,
            duedate: userdata.duedate,
            status: userdata.status,
        })))
    
        return task
    } catch (error) {
        reject(error)
    }

};

async function updateTodo(userdata, userid) {
    try {
        return Todo.update({
            name: userdata.name,
            priority: userdata.priority,
            description: userdata.description,
            duedate: userdata.duedate,
            status: userdata.status,
    
        }, { where: { userid: userid, id: userdata.id } })
    } catch (error) {
        reject(error)
    }
    
}

async function deleteTodo(userdata, userid) {
    try {
        return Todo.destroy({ where: { id: userdata.id, userid: userid } })
    } catch (error) {
        reject(error)
    }
}


export {
    getTodos,
    getTodosByUser,
    createTodo,
    updateTodo,
    deleteTodo,
    getTodosForToday
}
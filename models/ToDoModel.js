"use server"
// This is a Servercomponent, that is because Nextjs allows you to pass server functions down to the client components and executes them there

import { Todo } from '../services/database/model.js';
import { Op } from 'sequelize';
// This Model is basically built up like the NoteModel.js, the only difference being that there are more specific functions regarding the Todos

const getTodos = () => {
    return Todo.findAll();
};

async function getTodosByUser(userid) {
    // get all the todos for a specific user by the userid
    try {
        let tasks = JSON.parse(JSON.stringify(await Todo.findAll({
            // only fetch the ones that dont have the status "completed"
            where: { userid: userid, status: { [Op.not]: "completed" } },
        })))
        return tasks
    } catch (error) {
        reject(error)
    }

};

async function getTodosForToday(userid) {
    // get the current date....
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    var yyyy = today.getFullYear();

    // ...and reformat it to the start and the end of the day
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
                    // fetch all the tasks that have a duedate that is between the start and the end of the day
                    // this function is used because a function with a wildcard and LIKE didnt work (f.e. duedate LIKE today+"*")
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

async function getFinishedTodos(userid) {
    // this function will get all the tasks that are already finished
    // it will fetch all of the tasks that are connected to a user
    // and in the where clause of the query its set to only output the tasks where status is not "in progress" or "not started"
    try {
        let tasks = JSON.parse(JSON.stringify(await Todo.findAll({
            where: {
                status: "completed",
                userid: userid
            }
        })))
        return tasks
    }
    catch (error) {
        reject(error)
    }
}

async function createTodo(userdata, userid) {
    // this function is used to create a todo
    // the data is passed in the userdata
    // the userid is passed seperately
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
    //this function is used to update a todo
    // the data is passed in the userdata
    // the userid is passed seperately
    try {
        return Todo.update({
            name: userdata.name,
            priority: userdata.priority,
            description: userdata.description,
            duedate: userdata.duedate,
            status: userdata.status,
            // using the userid as well as the todo's id for the updating
        }, { where: { userid: userid, id: userdata.id } })
    } catch (error) {
        reject(error)
    }

}

async function deleteTodo(userdata, userid) {
    // this function will update a todo
    // the data is passed in the userdata
    // the userid is passed seperately
    // in the where clause both id's are used again
    try {
        return Todo.destroy({ where: { id: userdata.id, userid: userid } })
    } catch (error) {
        reject(error)
    }
}


export {
    getTodos,
    getTodosByUser,
    getFinishedTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    getTodosForToday
}
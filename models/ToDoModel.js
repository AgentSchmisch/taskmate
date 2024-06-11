import { Todo } from '../services/database/model.js';

const getTodos = () => {
return Todo.findAll();
};

const getTodosByUser = (userid) => {
return Todo.findAll({
where: {userid: userid},
});
};


export {getTodos, getTodosByUser}
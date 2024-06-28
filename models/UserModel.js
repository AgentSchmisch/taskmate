import { User } from '../services/database/model.js';
// this function is not used in the code currently

const getUsers = () => {
return User.findAll();
};

export {getUsers}
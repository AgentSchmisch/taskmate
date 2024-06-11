import { User } from '../services/database/model.js';

const getUsers = () => {
return User.findAll();
};

export {getUsers}
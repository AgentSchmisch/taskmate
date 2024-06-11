import { sequelize } from './database/model.js'; 

sequelize.sync({ force: true })

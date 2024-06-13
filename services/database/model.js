import {Sequelize, DataTypes } from 'sequelize';
import {config} from "dotenv";

config();


const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

const sequelize = new Sequelize({
    username: process.env.DB_USERNAME,
    database: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
        host: host,
        port: port,
        dialect: "mysql",
        dialectModule: require('mysql2'),
    });

sequelize.authenticate()
.then(() => {console.log("Connection via Sequelize successful!");})
.catch((err) => {console.error("Unable to connect to database: ", err);});


const User = sequelize.define('User', {
    userid: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
}, {
    tableName: 'users',
    timestamps: false,
});

const Todo = sequelize.define('Todo', {
    userid: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: User,
            key: 'userid',
        },
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    priority: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Not Started',
    },
    duedate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'todos',
    timestamps: false,
});

// Set up the association
User.hasMany(Todo, { foreignKey: 'userid' });
Todo.belongsTo(User, { foreignKey: 'userid' });

export {sequelize, User, Todo};

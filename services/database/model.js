import { Sequelize, DataTypes } from 'sequelize';
import { config } from "dotenv";

config();



const sequelize = new Sequelize({
    username: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    dialectModule: require('mysql2'),
});

sequelize.authenticate()
    .then(() => { console.log("Connection via Sequelize successful!"); })
    .catch((err) => { console.error("Unable to connect to database: ", err); });


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
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'not started',
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

const Note = sequelize.define("Note", {
    userid: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: User,
            key: 'userid',
        },
    },
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    creationDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
},
{
tableName: 'notes',
timestamps: false
});

User.hasMany(Note, { foreignKey: "userid" })
Note.belongsTo(User, { foreignKey: "userid" })

export { sequelize, User, Todo, Note };

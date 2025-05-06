const { DataTypes } = require("sequelize");
const sequelize = require('../config/sequelize');


const Registration = sequelize.define(
    'registrations',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
         
        },
        event_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'events',
                key: 'event_id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        registered_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },

    },
    {
        tableName: 'registrations',
        timestamps: false,

    }
);
module.exports = Registration;
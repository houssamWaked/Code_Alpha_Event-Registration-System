const { DataTypes } = require("sequelize");
const sequelize = require('../config/sequelize');

const Event = sequelize.define('events', {
    event_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    start_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'events',
    timestamps: false,
    underscored: true,
    modelName: 'Event',
    indexes: [
        {
            unique: true,
            fields: ['title']
        },
        {
            fields: ['created_by']
        },
        {
            fields: ['start_time']
        },
        {
            fields: ['end_time']
        },
    ]
});

module.exports = Event;

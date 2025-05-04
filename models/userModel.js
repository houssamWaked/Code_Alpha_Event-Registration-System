const DataTypes = require("sequelize");
const sequelize=require('../config/sequelize');

const User=sequelize.define(
    'users',
{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        
    },
    password_hash:{
        type:DataTypes.STRING,
        allowNull:false,
        
    },
    role:{
        type:DataTypes.ENUM('admin','user'),
        defaultValue:'user',
        allowNull:false,
        
    },
    created_at:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW,
        allowNull:false,
    
    },

},

{
    tableName:'users',
    timestamps:false,
    indexes: [
        {
            unique: true,
            fields: ['email']
        },
        {
            unique: true,
            fields: ['name']
        },
        {
            fields: ['role']
        },
        {
            fields: ['created_at']
        }
    ]

}
);
module.exports=User;
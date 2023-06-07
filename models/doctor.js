const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../db');

const Doctor = sequelize.define('Doctor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  fullname: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  
});

module.exports = Doctor;

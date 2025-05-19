const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Orphanage = sequelize.define('orphanages', { 
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  location: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  contact_number: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: true,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,  
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,  
    onUpdate: DataTypes.NOW,     
  },
  latitude: {
  type: DataTypes.DECIMAL(10, 8),
  allowNull: true,
},
longitude: {
  type: DataTypes.DECIMAL(11, 8),
  allowNull: true,
},

}, {
  tableName: 'orphanages',
  timestamps: false,  
});

module.exports = Orphanage;

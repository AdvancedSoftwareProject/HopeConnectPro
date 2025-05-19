const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Organization = sequelize.define('Organizations', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orphanage_id: { 
    type: DataTypes.INTEGER,
    references: {
      model: 'orphanages',
      key: 'id',
    },
  },
  organization_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  organization_type: {
    type: DataTypes.ENUM('NGO', 'Charity', 'Humanitarian Organization', 'Owner'),
    allowNull: false,
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verification_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'organizations',
  timestamps: false,
});

module.exports = Organization;

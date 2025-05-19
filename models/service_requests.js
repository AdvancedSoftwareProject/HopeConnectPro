const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Orphanage = require('./orphanages'); 

const ServiceRequest = sequelize.define('service_requests', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orphanageId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'orphanages', 
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  serviceType: {
    type: DataTypes.ENUM('Teaching', 'Mentoring', 'Healthcare Assistance', 'Other'),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  requestDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Matched', 'Completed', 'Cancelled'),
    defaultValue: 'Pending',
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'service_requests',
  timestamps: true, 
});


ServiceRequest.belongsTo(Orphanage, { foreignKey: 'orphanageId', onDelete: 'CASCADE' });
Orphanage.hasMany(ServiceRequest, { foreignKey: 'orphanageId' });

module.exports = ServiceRequest;

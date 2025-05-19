const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./Users'); 
const Orphanage = require('./orphanages'); 

const Donation = sequelize.define('donations', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users', 
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  orphanageId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'orphanages', 
      key: 'id',
    },
    onDelete: 'SET NULL',
  },
  category: {
    type: DataTypes.ENUM('General Fund', 'Education Support', 'Medical Aid'),
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
  },
  donationType: {
    type: DataTypes.ENUM('Money', 'Clothes', 'Food', 'Educational Materials'),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Completed', 'Cancelled'),
    defaultValue: 'Pending',
  },
  fundCategory: {
    type: DataTypes.ENUM('General Fund', 'Education Support', 'Medical Aid'),
  },
  usageDetails: {
    type: DataTypes.TEXT,
  },
  donationDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  trackingStatus: {
    type: DataTypes.ENUM('Pending', 'Completed', 'Used'),
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
  tableName: 'donations',
  timestamps: true, 
});

Donation.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
Donation.belongsTo(Orphanage, { foreignKey: 'orphanageId', onDelete: 'SET NULL' });

User.hasMany(Donation, { foreignKey: 'userId' });
Orphanage.hasMany(Donation, { foreignKey: 'orphanageId' });

module.exports = Donation;

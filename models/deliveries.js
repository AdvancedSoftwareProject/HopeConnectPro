const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./Users');
const Organization = require('./organizations');

const Delivery = sequelize.define('deliveries', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  delivery_code: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  },
  donor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  organization_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'organizations',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  delivery_type: {
    type: DataTypes.ENUM('Clothes', 'Food', 'Educational Material'),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  delivery_status: {
    type: DataTypes.ENUM('Pending', 'In Transit', 'Delivered', 'Failed'),
    defaultValue: 'Pending',
  },
  tracking_code: {
    type: DataTypes.STRING(100),
  },
  pickup_date: {
    type: DataTypes.DATE,
  },
  delivery_date: {
    type: DataTypes.DATE,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'deliveries',
  timestamps: false,
});

Delivery.belongsTo(User, { foreignKey: 'donor_id' });
Delivery.belongsTo(Organization, { foreignKey: 'organization_id' });

module.exports = Delivery;

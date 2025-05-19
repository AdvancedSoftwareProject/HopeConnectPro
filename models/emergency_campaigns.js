const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EmergencyCampaign = sequelize.define('emergency_campaigns', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  campaign_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  target_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  amount_raised: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  start_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('Active', 'Completed', 'Expired'),
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'emergency_campaigns',
  timestamps: false, 
});

module.exports = EmergencyCampaign;

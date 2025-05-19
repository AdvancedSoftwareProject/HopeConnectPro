const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./Users');
const EmergencyCampaign = require('./emergency_campaigns');


const EmergencyDonation = sequelize.define('emergency_donation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
  campaign_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'emergency_campaigns',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  donation_date: {
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'emergency_donations',
  timestamps: false,
});

EmergencyDonation.belongsTo(User, { foreignKey: 'donor_id' });
EmergencyDonation.belongsTo(EmergencyCampaign, { foreignKey: 'campaign_id' });

module.exports = EmergencyDonation;

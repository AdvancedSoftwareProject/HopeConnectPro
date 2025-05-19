const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DonorFeedback = sequelize.define('donor_feedback', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  donor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  organization_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  review_content: {
    type: DataTypes.TEXT,
  },
  created_at: {
    type: DataTypes.DATE,  
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'donor_feedback',
  timestamps: false,
});

module.exports = DonorFeedback;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Volunteer = require('./volunteers');
const ServiceRequest = require('./service_requests');

const VolunteerMatch = sequelize.define('volunteer_matches', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  volunteer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'volunteers',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  service_request_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'service_requests',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  match_status: {
    type: DataTypes.ENUM('Pending', 'Accepted', 'Completed', 'Cancelled'),
    defaultValue: 'Pending',
  },
  match_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  service_date: {
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
  tableName: 'volunteer_matches',
  timestamps: false,
});

VolunteerMatch.belongsTo(Volunteer, { foreignKey: 'volunteer_id', onDelete: 'CASCADE' });
VolunteerMatch.belongsTo(ServiceRequest, { foreignKey: 'service_request_id', onDelete: 'CASCADE' });

Volunteer.hasMany(VolunteerMatch, { foreignKey: 'volunteer_id' });
ServiceRequest.hasMany(VolunteerMatch, { foreignKey: 'service_request_id' });

module.exports = VolunteerMatch;

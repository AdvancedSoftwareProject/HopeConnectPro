const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./Users');
const Orphanage = require('./orphanages');  // إضافة استيراد نموذج Orphanage

const Volunteer = sequelize.define('volunteers', {
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
  
  skills: {
    type: DataTypes.TEXT,
  },
  availability: {
    type: DataTypes.TEXT,
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
  orphanageId: {  
    type: DataTypes.INTEGER,
    references: {
      model: 'orphanages',
      key: 'id',
    },
    onDelete: 'SET NULL', 
  },
}, {
  tableName: 'volunteers',
  timestamps: true,
});

Volunteer.belongsTo(Orphanage, { foreignKey: 'orphanageId', onDelete: 'SET NULL' });  
Orphanage.hasMany(Volunteer, { foreignKey: 'orphanageId' });

Volunteer.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Volunteer, { foreignKey: 'userId' });

module.exports = Volunteer;

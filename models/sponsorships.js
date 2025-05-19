const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Orphan = require('./orphans'); 
const User = require('./Users'); 

const Sponsorship = sequelize.define('sponsorships', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  orphanId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'orphans', 
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  endDate: {
    type: DataTypes.DATE,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Active', 'Completed', 'Cancelled'),
    allowNull: false,
    defaultValue: 'Active',
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
  tableName: 'sponsorships',
  timestamps: true,
});


Sponsorship.belongsTo(Orphan, { foreignKey: 'orphanId', onDelete: 'CASCADE' });
Sponsorship.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

Orphan.hasMany(Sponsorship, { foreignKey: 'orphanId' });
User.hasMany(Sponsorship, { foreignKey: 'userId' });

module.exports = Sponsorship;

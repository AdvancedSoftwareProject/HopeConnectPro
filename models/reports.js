const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Orphanage = require('./orphanages'); 

const Report = sequelize.define('reports', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orphanage_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'orphanages', 
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  report_content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  report_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  visibility: {
    type: DataTypes.ENUM('Public', 'Private'),
    defaultValue: 'Public',
  },
  income: { 
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  expenses: { 
    type: DataTypes.FLOAT,
    allowNull: false,
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
  tableName: 'reports',
  timestamps: false,
});

Report.belongsTo(Orphanage, { foreignKey: 'orphanage_id', onDelete: 'CASCADE' });
Orphanage.hasMany(Report, { foreignKey: 'orphanage_id' });

module.exports = Report;

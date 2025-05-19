const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Orphanage = require('./orphanages'); 

const Orphan = sequelize.define('orphans', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  full_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  date_of_birth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female'),
    allowNull: false,
  },
  orphanage_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'orphanages',
      key: 'id',
    },
    onDelete: 'SET NULL',
  },
  education_status: {
    type: DataTypes.TEXT,
  },
  health_condition: {
    type: DataTypes.TEXT,
  },
  update_content: {
    type: DataTypes.TEXT,
  },
  image_url: {
    type: DataTypes.STRING(255),
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'orphans',
  timestamps: false, 
});

Orphan.belongsTo(Orphanage, { foreignKey: 'orphanage_id', onDelete: 'SET NULL' });
Orphanage.hasMany(Orphan, { foreignKey: 'orphanage_id' });

module.exports = Orphan;

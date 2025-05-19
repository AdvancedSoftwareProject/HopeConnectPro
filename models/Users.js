const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Organization = require('./organizations'); 
const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  full_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING(20),
  },
  role: {
    type: DataTypes.ENUM('Donor', 'Volunteer', 'Admin', 'Organization', 'Owner'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Active', 'Inactive', 'Suspended'),
    defaultValue: 'Active',
  },
    reset_password_token: {
  type: DataTypes.STRING,
  allowNull: true,
},
reset_password_expiry: {
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
  last_login: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  profile_picture_url: {
    type: DataTypes.STRING(255),
  },
  address: {
    type: DataTypes.TEXT,
  },

  organization_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'organizations', 
      key: 'id',              
    },
    onDelete: 'SET NULL',  
  },
}, {
  tableName: 'users',
  timestamps: false,
});

User.belongsTo(Organization, { foreignKey: 'organization_id', onDelete: 'SET NULL' });
Organization.hasMany(User, { foreignKey: 'organization_id' });

module.exports = User;

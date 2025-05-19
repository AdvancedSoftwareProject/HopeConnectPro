const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Donation = require('./donations');
const Sponsorship = require('./sponsorships');
const Organization = require('./organizations');
const EmergencyDonation = require('./emergency_donations');
const Orphanage = require('./orphanages');

const Revenue = sequelize.define('revenue', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    source: {
        type: DataTypes.ENUM('Donation', 'Sponsorship', 'Partnership', 'Emergency Campaign'),
        allowNull: false,
    },
    donation_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'donations',
            key: 'id',
        },
        onDelete: 'SET NULL',
    },
    sponsorship_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'sponsorships',
            key: 'id',
        },
        onDelete: 'SET NULL',
    },
    partnership_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'organizations',
            key: 'id',
        },
        onDelete: 'SET NULL',
    },
   

    emergency_donation_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'emergency_donations',
            key: 'id',
        },
        onDelete: 'SET NULL',
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
    received_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'revenue',
    timestamps: false,
});

// تحديد العلاقات
Revenue.belongsTo(Donation, { foreignKey: 'donation_id', onDelete: 'SET NULL' });
Donation.hasMany(Revenue, { foreignKey: 'donation_id' });

Revenue.belongsTo(Sponsorship, { foreignKey: 'sponsorship_id', onDelete: 'SET NULL' });
Sponsorship.hasMany(Revenue, { foreignKey: 'sponsorship_id' });

Revenue.belongsTo(Organization, {
  foreignKey: 'partnership_id',as: 'organization',onDelete: 'SET NULL'});
Organization.hasMany(Revenue, {
  foreignKey: 'partnership_id',
  as: 'revenues',
});
Revenue.belongsTo(EmergencyDonation, { foreignKey: 'emergency_donation_id', onDelete: 'SET NULL' });
EmergencyDonation.hasMany(Revenue, { foreignKey: 'emergency_donation_id' });

Revenue.belongsTo(Orphanage, { foreignKey: 'orphanage_id', onDelete: 'SET NULL' });
Orphanage.hasMany(Revenue, { foreignKey: 'orphanage_id' });

module.exports = Revenue;

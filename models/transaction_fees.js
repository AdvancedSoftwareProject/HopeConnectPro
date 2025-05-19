const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const EmergencyDonation = require('./emergency_donations'); 
const TransactionFee = sequelize.define('transaction_fees', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    donation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'emergency_donations',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    fee_percentage: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    fee_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    transaction_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'transaction_fees',
    timestamps: false, 
});


TransactionFee.belongsTo(EmergencyDonation, { foreignKey: 'donation_id', onDelete: 'CASCADE' });
EmergencyDonation.hasMany(TransactionFee, { foreignKey: 'donation_id' });

module.exports = TransactionFee;

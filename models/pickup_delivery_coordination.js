const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Delivery = require('./deliveries');
const User = require('./Users');

const PickupDeliveryCoordination = sequelize.define('pickup_delivery_coordination', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    delivery_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'deliveries',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    pickup_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id',
        },
        onDelete: 'SET NULL',
    },
    delivery_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id',
        },
        onDelete: 'SET NULL',
    },
    pickup_location: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    delivery_location: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Scheduled', 'In Progress', 'Completed', 'Failed'),
        allowNull: false,
    },
    scheduled_pickup_time: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    scheduled_delivery_time: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    actual_pickup_time: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    actual_delivery_time: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'pickup_delivery_coordination',
    timestamps: false, 
});

// تحديد العلاقات
PickupDeliveryCoordination.belongsTo(Delivery, { foreignKey: 'delivery_id', onDelete: 'CASCADE' });
Delivery.hasMany(PickupDeliveryCoordination, { foreignKey: 'delivery_id' });

PickupDeliveryCoordination.belongsTo(User, { foreignKey: 'pickup_by', onDelete: 'SET NULL' });
User.hasMany(PickupDeliveryCoordination, { foreignKey: 'pickup_by' });

PickupDeliveryCoordination.belongsTo(User, { foreignKey: 'delivery_by', onDelete: 'SET NULL' });
User.hasMany(PickupDeliveryCoordination, { foreignKey: 'delivery_by' });

module.exports = PickupDeliveryCoordination;

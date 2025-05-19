const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Delivery = require('./deliveries'); 

const TrackingUpdate = sequelize.define('tracking_updates', {
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
    update_message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    update_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    status: {
        type: DataTypes.ENUM('Pending', 'In Transit', 'Delivered', 'Failed'),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'tracking_updates',
    timestamps: false,
});


TrackingUpdate.belongsTo(Delivery, { foreignKey: 'delivery_id', onDelete: 'CASCADE' });
Delivery.hasMany(TrackingUpdate, { foreignKey: 'delivery_id' });

module.exports = TrackingUpdate;


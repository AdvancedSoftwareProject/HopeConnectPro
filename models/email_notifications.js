const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const User = require('./Users');
const EmergencyCampaign = require('./emergency_campaigns');

const EmailNotification = sequelize.define('email_notifications', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    campaign_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'emergency_campaigns',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    email_subject: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email_body: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    sent_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    status: {
        type: DataTypes.ENUM('Sent', 'Failed'),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'email_notifications',
    timestamps: false, 
});


EmailNotification.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(EmailNotification, { foreignKey: 'user_id' });

EmailNotification.belongsTo(EmergencyCampaign, { foreignKey: 'campaign_id', onDelete: 'CASCADE' });
EmergencyCampaign.hasMany(EmailNotification, { foreignKey: 'campaign_id' });

module.exports = EmailNotification;



const nodemailer = require("nodemailer");

const EmailNotification = require("../models/email_notifications");
const User = require("../models/Users");
const EmergencyCampaign = require("../models/emergency_campaigns");







exports.createEmailNotification = async (req, res) => {
    try {
        const {
            user_id,
            campaign_id,
            email_subject,
            email_body
        } = req.body;

        
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: `User with ID ${user_id} not found.` });
        }

    
        const campaign = await EmergencyCampaign.findByPk(campaign_id);
        if (!campaign) {
            return res.status(404).json({ message: `Campaign with ID ${campaign_id} not found.` });
        }

        
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER2,
                pass: process.env.EMAIL_PASS2
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER2,
            to: user.email,
            subject: email_subject,
            text: email_body
        };

       
        let status = "Sent";
        let sent_at = new Date();

        try {
            await transporter.sendMail(mailOptions);
        } catch (err) {
            console.error("Email sending failed:", err.message);
            status = "Failed";
            sent_at = null;
        }

       
        const notification = await EmailNotification.create({
            user_id,
            campaign_id,
            email_subject,
            email_body,
            status,
            sent_at
        });

       
        const responseStatus = status === "Sent" ? 201 : 200;

        res.status(responseStatus).json({
            message: "Email notification processed.",
            status,
            id: notification.id
        });

    } catch (error) {
        console.error("Error creating email notification:", error);
        res.status(500).json({ error: error.message });
    }
};






exports.getAllEmailNotifications = async (req, res) => {
    try {
        const notifications = await EmailNotification.findAll();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getEmailNotificationById = async (req, res) => {
    try {
        const id = req.params.id;
        const notification = await EmailNotification.findByPk(id);

        if (!notification) {
            return res.status(404).json({ message: `Email notification with ID ${id} not found.` });
        }

        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateEmailNotification = async (req, res) => {
    try {
        const id = req.params.id;
        const notification = await EmailNotification.findByPk(id);

        if (!notification) {
            return res.status(404).json({ message: `Email notification with ID ${id} not found.` });
        }

        await notification.update(req.body);

        res.status(200).json({
            message: "Email notification updated successfully.",
            id: notification.id
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.deleteEmailNotification = async (req, res) => {
    try {
        const id = req.params.id;
        const notification = await EmailNotification.findByPk(id);

        if (!notification) {
            return res.status(404).json({ message: `Email notification with ID ${id} not found.` });
        }

        await notification.destroy();

        res.status(200).json({ message: "Email notification deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

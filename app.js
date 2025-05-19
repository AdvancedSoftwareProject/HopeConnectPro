

const express = require("express");
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
app.use(bodyParser.json());
app.use(express.json());
const path = require('path');
dotenv.config();

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const orphanRoutes = require('./routes/orphanRoutes'); 
app.use('/api/', orphanRoutes);


const volunteerRoutes = require('./routes/volunteerRoutes'); 
app.use('/api/', volunteerRoutes);

const sponsorshipRoutes = require('./routes/sponsorshipRoutes'); 
app.use('/api/', sponsorshipRoutes);

const donationRoutes = require('./routes/donationRoutes'); 
app.use('/api/', donationRoutes);


const serviceRequestRoutes = require('./routes/serviceRequestRoutes'); 
app.use('/api/', serviceRequestRoutes);

const organizationRoutes = require('./routes/organizationRoutes'); 
app.use('/api/', organizationRoutes);

const deliveriesRoutes = require('./routes/deliveriesRoutes');
app.use('/api/deliveries', deliveriesRoutes);

const donorFeedbackRoutes = require('./routes/donorFeedbackRoutes');
app.use('/api/feedbacks', donorFeedbackRoutes);

const emergencyCampaignRoutes = require('./routes/emergencyCampaignRoutes');
app.use('/api/emergency-campaigns', emergencyCampaignRoutes);

const emergencyDonationRoutes = require('./routes/emergencyDonationRoutes');
app.use('/api/emergency-donations', emergencyDonationRoutes);

const volunteerMatchRoutes = require('./routes/volunteerMatchRoutes');
app.use('/api/volunteer-matches', volunteerMatchRoutes);

const orphanageRoutes = require('./routes/orphanageRoutes'); 
app.use('/api/orphanages', orphanageRoutes);

const trackingUpdateRoutes = require('./routes/trackingUpdateRoutes');
app.use('/api/tracking_updates', trackingUpdateRoutes);

const transactionFeesRoutes = require("./routes/transactionFeesRoutes");
app.use("/api/transaction-fees", transactionFeesRoutes);


const revenueRoutes = require("./routes/revenueRoutes");
app.use("/api/revenue", revenueRoutes);


const coordinationRoutes = require("./routes/pickupDeliveryCoordinationRoutes");
app.use("/api/pickup-coordination", coordinationRoutes);


const emailNotificationRoutes = require("./routes/emailNotificationRoutes");
app.use("/api/email-notifications", emailNotificationRoutes);


const messageRoutes = require('./routes/messagesRoutes'); 
app.use('/api/messages', messageRoutes);

const reportRoutes = require('./routes/reportRoutes');
app.use('/api/reports', reportRoutes);


app.use('/output', express.static(path.join(__dirname, 'output')));





(async () => {
  try {
    await sequelize.sync(); 
    console.log('Database synchronized successfully ✅ ');
  } catch (error) {
    console.error(' Error during synchronization: ❌', error);
  }
})();



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

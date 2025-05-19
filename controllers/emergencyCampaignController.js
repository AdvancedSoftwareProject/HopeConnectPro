
const EmergencyCampaign = require('../models/emergency_campaigns');
const { fetchEmergencyDisasters } = require('../Apis/emergency_campaigns');
const { exportEmergencyCampaigns } = require('../Apis/exportEmergencyCampaignsToSheet');

exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await EmergencyCampaign.findAll();
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching campaigns', error: err.message });
  }
};

exports.createCampaign = async (req, res) => {
  try {
    const newCampaign = await EmergencyCampaign.create(req.body);
    res.status(201).json(newCampaign);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create campaign', error: err.message });
  }
};

exports.updateCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const campaign = await EmergencyCampaign.findByPk(id);

    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    if (campaign.status === 'Completed' || campaign.status === 'Expired') return res.status(403).json({ message: 'Cannot update a completed or expired campaign' });
    if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Only Admin can update campaigns' });

    await campaign.update(req.body);
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ message: 'Error updating campaign', error: err.message });
  }
};

exports.deleteCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const campaign = await EmergencyCampaign.findByPk(id);

    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    if (campaign.status === 'Completed' || campaign.status === 'Expired') return res.status(403).json({ message: 'Cannot delete a completed or expired campaign' });
    if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Only Admin can delete campaigns' });

    await campaign.destroy();
    res.json({ message: 'Campaign deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting campaign', error: err.message });
  }
};

exports.fetchExternalDisasters = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const data = await fetchEmergencyDisasters(limit);
    res.status(200).json({ message: "Disaster data fetched successfully", count: data.length, data });
  } catch (error) {
    console.error("❌ Error fetching external disasters:", error.message);
    res.status(500).json({ message: "Failed to fetch external disaster data", error: error.message });
  }
};

exports.exportToGoogleSheet = async (req, res) => {
  const result = await exportEmergencyCampaigns();
  if (result.success) {
    return res.status(200).json({ message: "Emergency campaigns exported to Google Sheets successfully.", count: result.count });
  } else {
    return res.status(500).json({ message: "Failed to export emergency campaigns.", error: result.error });
  }
};

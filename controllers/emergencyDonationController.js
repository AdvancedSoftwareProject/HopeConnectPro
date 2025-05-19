const EmergencyDonation = require('../models/emergency_donations');
const User = require('../models/Users');
const EmergencyCampaign = require('../models/emergency_campaigns');


exports.getAllEmergencyDonations = async (req, res) => {
  try {
    const donations = await EmergencyDonation.findAll({
      include: [
        { model: User, attributes: ['id', 'full_name', 'email'] },
        { model: EmergencyCampaign, attributes: ['id', 'campaign_name'] }
      ]
    });
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching emergency donations', error: error.message });
  }
};


exports.getEmergencyDonationsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const donations = await EmergencyDonation.findAll({
      where: { donor_id: userId },
      include: [
        { model: EmergencyCampaign, attributes: ['id', 'campaign_name'] }
      ]
    });

    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching donations for user', error: error.message });
  }
};


exports.getEmergencyDonationById = async (req, res) => {
  try {
    const donation = await EmergencyDonation.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['id', 'full_name', 'email'] },
        { model: EmergencyCampaign, attributes: ['id', 'campaign_name'] }
      ]
    });
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    res.status(200).json(donation);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching donation', error: error.message });
  }
};


exports.createEmergencyDonation = async (req, res) => {
  try {
    const { donor_id, campaign_id, amount } = req.body;

    const donation = await EmergencyDonation.create({
      donor_id,
      campaign_id,
      amount
    });

    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({ message: 'Error creating donation', error: error.message });
  }
};


exports.deleteEmergencyDonation = async (req, res) => {
  try {
    const donation = await EmergencyDonation.findByPk(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    await donation.destroy();
    res.status(200).json({ message: 'Donation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting donation', error: error.message });
  }
};
exports.updateEmergencyDonation = async (req, res) => {
    try {
      const donation = await EmergencyDonation.findByPk(req.params.id);
      if (!donation) {
        return res.status(404).json({ message: 'Donation not found' });
      }
  
      const updatedDonation = await donation.update(req.body);
      res.status(200).json(updatedDonation);
    } catch (error) {
      res.status(500).json({ message: 'Error updating donation', error: error.message });
    }
  };
  
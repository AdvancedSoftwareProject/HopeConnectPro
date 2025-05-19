const Donation = require('../models/donations');
const User = require('../models/Users');
const Orphanage = require('../models/orphanages');
const { verifyPayment } = require('../Apis/paymentVerification');


exports.getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.findAll({
      include: [
        { model: User, attributes: ['id', 'full_name', 'email'] },
        { model: Orphanage, attributes: ['id', 'name'] }
      ]
    });
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching donations', error: error.message });
  }
};


exports.getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['id', 'full_name', 'email'] },
        { model: Orphanage, attributes: ['id', 'name'] }
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


exports.createDonation = async (req, res) => {
  try {
    const {
      userId,
      orphanageId,
      category,
      amount,
      donationType,
      description,
      fundCategory,
      usageDetails,
      transactionId 
    } = req.body;

   
    if (donationType === 'Money' && transactionId) {
      const verification = await verifyPayment(transactionId, amount);
      
      if (!verification.verified) {
        return res.status(400).json({ 
          message: 'Payment verification failed', 
          error: verification.error 
        });
      }
    }

    const donation = await Donation.create({
      userId,
      orphanageId,
      category,
      amount,
      donationType,
      description,
      fundCategory,
      usageDetails,
      status: 'Pending',
      trackingStatus: 'Pending'
    });

    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({ message: 'Error creating donation', error: error.message });
  }
};


exports.updateDonation = async (req, res) => {
  try {
    const donation = await Donation.findByPk(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    const updatedDonation = await donation.update(req.body);
    res.status(200).json(updatedDonation);
  } catch (error) {
    res.status(500).json({ message: 'Error updating donation', error: error.message });
  }
};


exports.deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findByPk(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    await donation.destroy();
    res.status(200).json({ message: 'Donation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting donation', error: error.message });
  }
};


exports.getUserDonations = async (req, res) => {
  try {
    const donations = await Donation.findAll({
      where: { userId: req.params.userId },
      include: [
        { model: Orphanage, attributes: ['id', 'name'] }
      ]
    });
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user donations', error: error.message });
  }
};


exports.getOrphanageDonations = async (req, res) => {
  try {
    const donations = await Donation.findAll({
      where: { orphanageId: req.params.orphanageId },
      include: [
        { model: User, attributes: ['id', 'full_name', 'email'] }
      ]
    });
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orphanage donations', error: error.message });
  }
};


exports.updateDonationStatus = async (req, res) => {
  try {
    const { status, trackingStatus } = req.body;
    const donation = await Donation.findByPk(req.params.id);
    
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    await donation.update({ status, trackingStatus });
    res.status(200).json(donation);
  } catch (error) {
    res.status(500).json({ message: 'Error updating donation status', error: error.message });
  }
};


exports.verifyDonationPayment = async (req, res) => {
  try {
    const { donationId } = req.params;
    
   
    const donation = await Donation.findByPk(donationId);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    
    
    if (donation.donationType !== 'Money') {
      return res.status(400).json({ message: 'Only money donations require payment verification' });
    }
    
   
    const verification = await verifyPayment(donationId, donation.amount);
    
    if (verification.verified) {
      
      await donation.update({ 
        status: 'Completed',
        trackingStatus: 'Completed'
      });
      
      res.status(200).json({ 
        message: 'Payment verified successfully', 
        donation,
        verification 
      });
    } else {
      res.status(400).json({ 
        message: 'Payment verification failed', 
        error: verification.error 
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error verifying payment', error: error.message });
  }
};

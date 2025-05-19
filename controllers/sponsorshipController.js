const Sponsorship = require('../models/sponsorships');
const User = require('../models/Users');
const Orphan = require('../models/orphans');


exports.getAllSponsorships = async (req, res) => {
  try {
    const sponsorships = await Sponsorship.findAll({
      include: [
        { model: User, attributes: ['id', 'full_name', 'email'] },
        { model: Orphan, attributes: ['id', 'full_name', 'date_of_birth'] }
      ]
    });
    res.status(200).json(sponsorships);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sponsorships', error: error.message });
  }
};


exports.getSponsorshipById = async (req, res) => {
  try {
    const sponsorship = await Sponsorship.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['id', 'full_name', 'email'] },
        { model: Orphan, attributes: ['id', 'full_name', 'date_of_birth'] }
      ]
    });
    if (!sponsorship) {
      return res.status(404).json({ message: 'Sponsorship not found' });
    }
    res.status(200).json(sponsorship);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sponsorship', error: error.message });
  }
};


exports.createSponsorship = async (req, res) => {
  try {
    const {
      startDate,
      orphanId,
      userId,
      endDate,
      amount
    } = req.body;

    
    const existingSponsorship = await Sponsorship.findOne({
      where: {
        orphanId,
        status: 'Active'
      }
    });

    if (existingSponsorship) {
      return res.status(400).json({ message: 'This orphan is already sponsored' });
    }

    const sponsorship = await Sponsorship.create({
      startDate,
      orphanId,
      userId,
      endDate,
      amount,
      status: 'Active'
    });

    res.status(201).json(sponsorship);
  } catch (error) {
    res.status(500).json({ message: 'Error creating sponsorship', error: error.message });
  }
};


exports.updateSponsorship = async (req, res) => {
  try {
    const sponsorship = await Sponsorship.findByPk(req.params.id);
    if (!sponsorship) {
      return res.status(404).json({ message: 'Sponsorship not found' });
    }

    const updatedSponsorship = await sponsorship.update(req.body);
    res.status(200).json(updatedSponsorship);
  } catch (error) {
    res.status(500).json({ message: 'Error updating sponsorship', error: error.message });
  }
};


exports.endSponsorship = async (req, res) => {
  try {
    const sponsorship = await Sponsorship.findByPk(req.params.id);
    if (!sponsorship) {
      return res.status(404).json({ message: 'Sponsorship not found' });
    }

    await sponsorship.update({
      status: 'Completed',
      endDate: new Date()
    });

    res.status(200).json({ message: 'Sponsorship ended successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error ending sponsorship', error: error.message });
  }
};


exports.getUserSponsorships = async (req, res) => {
  try {
    const sponsorships = await Sponsorship.findAll({
      where: { userId: req.params.userId },
      include: [
        { model: Orphan, attributes: ['id', 'full_name', 'date_of_birth'] }
      ]
    });
    res.status(200).json(sponsorships);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user sponsorships', error: error.message });
  }
};


exports.getOrphanSponsorships = async (req, res) => {
  try {
    const sponsorships = await Sponsorship.findAll({
      where: { orphanId: req.params.orphanId },
      include: [
        { model: User, attributes: ['id', 'full_name', 'email'] }
      ]
    });
    res.status(200).json(sponsorships);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orphan sponsorships', error: error.message });
  }
}; 

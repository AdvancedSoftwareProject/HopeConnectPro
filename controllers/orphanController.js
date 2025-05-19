const Orphanage = require('../models/orphanages');
const Orphan = require('../models/orphans');
const Sponsorship = require('../models/sponsorships');
const { Op } = require('sequelize');
const { body, validationResult } = require('express-validator');



exports.getAllOrphans = async (req, res) => {
  try {
    const orphans = await Orphan.findAll();
    res.json(orphans); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orphans', error: error.message });
  }
};


exports.getOrphanById = async (req, res) => {
  try {
    const orphan = await Orphan.findByPk(req.params.id);
    if (!orphan) return res.status(404).json({ message: 'Orphan not found' });
    res.status(200).json(orphan);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orphan', error: error.message });
  }
};



exports.createOrphan = async (req, res) => {
  try {
    const { full_name, date_of_birth, gender, orphanage_id, education_status, health_condition, update_content, image_url } = req.body;

    if (!full_name || !date_of_birth || !gender) {
      return res.status(400).json({ message: 'Full name, date of birth, and gender are required' });
    }

    
    const orphan = await Orphan.create({
      full_name,
      date_of_birth,
      gender,
      orphanage_id, 
      education_status,
      health_condition,
      update_content,
      image_url
    });

    res.status(201).json({ message: 'Orphan created successfully', orphan });
  } catch (error) {
    res.status(500).json({ message: 'Error creating orphan', error: error.message });
  }
};


exports.updateOrphan = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, date_of_birth, gender, education_status, health_condition, update_content, image_url } = req.body;

    
    const orphan = await Orphan.findByPk(id);

    if (!orphan) {
      return res.status(404).json({ message: 'Orphan not found' });
    }

    
    orphan.full_name = full_name || orphan.full_name;
    orphan.date_of_birth = date_of_birth || orphan.date_of_birth;
    orphan.gender = gender || orphan.gender;
    orphan.education_status = education_status || orphan.education_status;
    orphan.health_condition = health_condition || orphan.health_condition;
    orphan.update_content = update_content || orphan.update_content;
    orphan.image_url = image_url || orphan.image_url;

    await orphan.save();

    res.status(200).json({ message: 'Orphan updated successfully', orphan });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.deleteOrphan = async (req, res) => {
  try {
    const orphan = await Orphan.findByPk(req.params.id);
    if (!orphan) return res.status(404).json({ message: 'Orphan not found' });

    await orphan.destroy();
    res.status(200).json({ message: 'Orphan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting orphan', error: error.message });
  }
};


exports.getOrphanSponsorshipStatus = async (req, res) => {
  try {
    const orphan = await Orphan.findByPk(req.params.id);
    if (!orphan) return res.status(404).json({ message: 'Orphan not found' });

    const activeSponsorship = await Sponsorship.findOne({
      where: { orphanId: req.params.id, status: 'Active' },
      include: [{ model: Orphan, attributes: ['id', 'full_name'] }],
    });

    res.status(200).json({
      orphanId: orphan.id,
      orphanName: orphan.full_name,
      isSponsored: !!activeSponsorship,
      sponsorshipDetails: activeSponsorship || 'No active sponsorship',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sponsorship status', error: error.message });
  }
};



exports.getOrphansByOrphanage = async (req, res) => {
  try {
    const { orphanageId } = req.params;

    const orphans = await Orphan.findAll({
      where: { orphanage_id: orphanageId },
      include: [{ model: Orphanage, attributes: ['id', 'name', 'location'] }],
    });

    if (!orphans.length) {
      return res.status(404).json({ message: 'No orphans found for this orphanage' });
    }

    res.status(200).json(orphans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orphans by orphanage', error: error.message });
  }
};


exports.updateEducationStatus = async (req, res) => {
  try {
    const orphan = await Orphan.findByPk(req.params.id);
    if (!orphan) return res.status(404).json({ message: 'Orphan not found' });

    const { education_status } = req.body;
    if (!education_status) {
      return res.status(400).json({ message: 'Education status is required' });
    }

    await orphan.update({ education_status });
    res.status(200).json({ message: 'Education status updated successfully', orphan });
  } catch (error) {
    res.status(500).json({ message: 'Error updating education status', error: error.message });
  }
};


exports.updateHealthCondition = async (req, res) => {
  try {
    const orphan = await Orphan.findByPk(req.params.id);
    if (!orphan) return res.status(404).json({ message: 'Orphan not found' });

    const { health_condition } = req.body;
    if (!health_condition) {
      return res.status(400).json({ message: 'Health condition is required' });
    }

    await orphan.update({ health_condition });
    res.status(200).json({ message: 'Health condition updated successfully', orphan });
  } catch (error) {
    res.status(500).json({ message: 'Error updating health condition', error: error.message });
  }
};
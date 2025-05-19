const VolunteerMatch = require('../models/volunteer_matches');
const Volunteer = require('../models/volunteers');
const ServiceRequest = require('../models/service_requests');

exports.getAllVolunteerMatches = async (req, res) => {
  try {
    const matches = await VolunteerMatch.findAll({
      include: [
        { model: Volunteer },
        { model: ServiceRequest }
      ]
    });
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching matches', error: error.message });
  }
};

exports.getVolunteerMatchById = async (req, res) => {
  try {
    const match = await VolunteerMatch.findByPk(req.params.id, {
      include: [
        { model: Volunteer },
        { model: ServiceRequest }
      ]
    });
    if (!match) return res.status(404).json({ message: 'Match not found' });

    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching match', error: error.message });
  }
};

exports.createVolunteerMatch = async (req, res) => {
  try {
    const { volunteer_id, service_request_id, match_status, service_date } = req.body;

    const match = await VolunteerMatch.create({
      volunteer_id,
      service_request_id,
      match_status,
      service_date
    });

    res.status(201).json(match);
  } catch (error) {
    res.status(500).json({ message: 'Error creating match', error: error.message });
  }
};

exports.updateVolunteerMatch = async (req, res) => {
  try {
    const match = await VolunteerMatch.findByPk(req.params.id);
    if (!match) return res.status(404).json({ message: 'Match not found' });

    const updated = await match.update(req.body);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating match', error: error.message });
  }
};

exports.deleteVolunteerMatch = async (req, res) => {
  try {
    const match = await VolunteerMatch.findByPk(req.params.id);
    if (!match) return res.status(404).json({ message: 'Match not found' });

    await match.destroy();
    res.status(200).json({ message: 'Match deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting match', error: error.message });
  }
};

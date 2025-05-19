const { Op } = require('sequelize');
const Orphanage = require('../models/orphanages');
const Volunteer = require('../models/volunteers');
const Donation = require('../models/donations');
const Orphan = require('../models/orphans');
const { geocodeAddress } = require('../Apis/orphanageLocation'); 

const createOrphanage = async (req, res) => {
  try {
    const { name, location, contact_number, email, capacity, description } = req.body;

    if (!name || !location) {
      return res.status(400).json({ message: 'Please provide name and location for the orphanage' });
    }

    const coords = await geocodeAddress(location);
    if (coords.error) {
      return res.status(400).json({ message: 'Unable to determine location coordinates' });
    }

    const newOrphanage = await Orphanage.create({
      name,
      location,
      contact_number,
      email,
      capacity,
      description,
      latitude: coords.lat,
      longitude: coords.lon,
    });

    res.status(201).json(newOrphanage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};



const searchOrphanages = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ message: 'Please provide a search term' });
        }

        const orphanages = await Orphanage.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${query}%` } },
                    { location: { [Op.like]: `%${query}%` } }
                ]
            }
        });

        res.json(orphanages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const checkOrphanageCapacity = async (req, res) => {
    try {
        const { orphanageId } = req.params;
        const orphanage = await Orphanage.findByPk(orphanageId);
        if (!orphanage) {
            return res.status(404).json({ message: 'Orphanage not found' });
        }

        const currentOrphanCount = await Orphan.count({ where: { orphanage_id: orphanageId } });
        if (currentOrphanCount >= orphanage.capacity) {
            return res.status(400).json({ message: 'The orphanage is full and cannot accept more orphans' });
        }

        res.json({ message: 'A new orphan can be added' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getOrphanageDetails = async (req, res) => {
    try {
        const { orphanageId } = req.params;
        const orphanage = await Orphanage.findByPk(orphanageId, {
            include: [
                { model: Volunteer, attributes: ['id', 'skills', 'availability'] },
                { model: Donation, attributes: ['id', 'category', 'amount', 'donationType', 'status'] }
            ]
        });

        if (!orphanage) {
            return res.status(404).json({ message: 'Orphanage not found' });
        }

        res.json(orphanage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteOrphanage = async (req, res) => {
  try {
    const { orphanageId } = req.params;

    const orphanage = await Orphanage.findByPk(orphanageId);
    if (!orphanage) {
      return res.status(404).json({ message: 'Orphanage not found' });
    }

    await orphanage.destroy();

    res.json({ message: 'Orphanage deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
    createOrphanage,
    searchOrphanages,
    checkOrphanageCapacity,
    getOrphanageDetails,
    deleteOrphanage
};

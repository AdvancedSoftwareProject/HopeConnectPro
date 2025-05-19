const Volunteer = require('../models/volunteers');
const User = require('../models/Users');
const Orphanage = require('../models/orphanages');



exports.getAllVolunteers = async (req, res) => {
    try {
      const volunteers = await Volunteer.findAll({
        include: [
          { model: User, attributes: ['id', 'full_name', 'email'] } 
        ]
      });
  
      res.status(200).json(volunteers); 
    } catch (error) {
      console.error('Error fetching volunteers:', error); 
      res.status(500).json({ message: 'Error fetching volunteers', error: error.message });
    }
  };

exports.getVolunteerById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const volunteer = await Volunteer.findByPk(id, {
        include: [{ model: User, attributes: ['id', 'full_name', 'email'] }]
      });
  
      if (!volunteer) {
        return res.status(404).json({ message: 'Volunteer not found' });
      }
  
      res.status(200).json(volunteer);
    } catch (error) {
      console.error('Error fetching volunteer:', error);
      res.status(500).json({ message: 'Error fetching volunteer', error: error.message });
    }
  };


exports.createVolunteer = async (req, res) => {
  try {
    const { userId, skills, availability, orphanageId } = req.body;

    
    const existingVolunteer = await Volunteer.findOne({
      where: { userId }
    });

    if (existingVolunteer) {
      return res.status(400).json({ message: 'User is already registered as a volunteer' });
    }

    
    const orphanage = await Orphanage.findByPk(orphanageId);
    if (!orphanage) {
      return res.status(404).json({ message: 'Orphanage not found' });
    }

   
    const volunteer = await Volunteer.create({
      userId,
      skills,
      availability,
      orphanageId  
    });

    
    const volunteerWithOrphanage = await Volunteer.findOne({
      where: { id: volunteer.id },
      include: [{
        model: Orphanage,
        attributes: ['id', 'name']  
      }]
    });

    res.status(201).json(volunteerWithOrphanage);  
  } catch (error) {
    res.status(500).json({ message: 'Error creating volunteer', error: error.message });
  }
};




exports.updateVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findByPk(req.params.id);
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    const updatedVolunteer = await volunteer.update(req.body);
    res.status(200).json(updatedVolunteer);
  } catch (error) {
    res.status(500).json({ message: 'Error updating volunteer', error: error.message });
  }
};


exports.deleteVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findByPk(req.params.id);
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    await volunteer.destroy();
    res.status(200).json({ message: 'Volunteer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting volunteer', error: error.message });
  }
};


exports.getVolunteerByUserId = async (req, res) => {
  try {
    const volunteer = await Volunteer.findOne({
      where: { userId: req.params.userId },
      include: [
        { model: User, attributes: ['id','full_name','email'] }
      ]
    });
    
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found for this user' });
    }
    
    res.status(200).json(volunteer);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching volunteer by user ID', error: error.message });
  }
};


exports.updateVolunteerAvailability = async (req, res) => {
  try {
    const { availability } = req.body;
    const volunteer = await Volunteer.findByPk(req.params.id);
    
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    await volunteer.update({ availability });
    res.status(200).json(volunteer);
  } catch (error) {
    res.status(500).json({ message: 'Error updating volunteer availability', error: error.message });
  }
};


exports.updateVolunteerSkills = async (req, res) => {
  try {
    const { skills } = req.body;
    const volunteer = await Volunteer.findByPk(req.params.id);
    
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    await volunteer.update({ skills });
    res.status(200).json(volunteer);
  } catch (error) {
    res.status(500).json({ message: 'Error updating volunteer skills', error: error.message });
  }
};



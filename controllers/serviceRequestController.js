const ServiceRequest = require('../models/service_requests');
const Orphanage = require('../models/orphanages');


exports.getAllServiceRequests = async (req, res) => {
  try {
    const serviceRequests = await ServiceRequest.findAll({
      include: [
        { model: Orphanage, attributes: ['id', 'name', 'location'] }
      ]
    });
    res.status(200).json(serviceRequests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service requests', error: error.message });
  }
};


exports.getServiceRequestById = async (req, res) => {
  try {
    const serviceRequest = await ServiceRequest.findByPk(req.params.id, {
      include: [
        { model: Orphanage, attributes: ['id', 'name', 'location'] }
      ]
    });
    if (!serviceRequest) {
      return res.status(404).json({ message: 'Service request not found' });
    }
    res.status(200).json(serviceRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service request', error: error.message });
  }
};


exports.createServiceRequest = async (req, res) => {
  try {
    const {
      orphanageId,
      serviceType,
      description
    } = req.body;

    const serviceRequest = await ServiceRequest.create({
      orphanageId,
      serviceType,
      description,
      status: 'Pending',
      requestDate: new Date()
    });

    res.status(201).json(serviceRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error creating service request', error: error.message });
  }
};


exports.updateServiceRequest = async (req, res) => {
  try {
    const serviceRequest = await ServiceRequest.findByPk(req.params.id);
    if (!serviceRequest) {
      return res.status(404).json({ message: 'Service request not found' });
    }

    const updatedServiceRequest = await serviceRequest.update(req.body);
    res.status(200).json(updatedServiceRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error updating service request', error: error.message });
  }
};


exports.deleteServiceRequest = async (req, res) => {
  try {
    const serviceRequest = await ServiceRequest.findByPk(req.params.id);
    if (!serviceRequest) {
      return res.status(404).json({ message: 'Service request not found' });
    }

    await serviceRequest.destroy();
    res.status(200).json({ message: 'Service request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service request', error: error.message });
  }
};


exports.getOrphanageServiceRequests = async (req, res) => {
  try {
    const serviceRequests = await ServiceRequest.findAll({
      where: { orphanageId: req.params.orphanageId }
    });
    res.status(200).json(serviceRequests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orphanage service requests', error: error.message });
  }
};


exports.updateServiceRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const serviceRequest = await ServiceRequest.findByPk(req.params.id);
    
    if (!serviceRequest) {
      return res.status(404).json({ message: 'Service request not found' });
    }

    await serviceRequest.update({ status });
    res.status(200).json(serviceRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error updating service request status', error: error.message });
  }
};


exports.getServiceRequestsByType = async (req, res) => {
  try {
    const serviceRequests = await ServiceRequest.findAll({
      where: { serviceType: req.params.type },
      include: [
        { model: Orphanage, attributes: ['id', 'name', 'location'] }
      ]
    });
    res.status(200).json(serviceRequests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service requests by type', error: error.message });
  }
}; 

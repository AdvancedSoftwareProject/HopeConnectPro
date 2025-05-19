const Delivery = require('../models/deliveries');

exports.getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.findAll();
    res.json(deliveries);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching deliveries', error: err.message });
  }
};

exports.createDelivery = async (req, res) => {
  try {
    const newDelivery = await Delivery.create(req.body);
    res.status(201).json(newDelivery);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create delivery', error: err.message });
  }
};

exports.updateDelivery = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Delivery.update(req.body, { where: { id } });
    if (updated) {
      const updatedDelivery = await Delivery.findByPk(id);
      res.json(updatedDelivery);
    } else {
      res.status(404).json({ message: 'Delivery not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating delivery', error: err.message });
  }
};

exports.deleteDelivery = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Delivery.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: 'Delivery deleted successfully' });
    } else {
      res.status(404).json({ message: 'Delivery not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting delivery', error: err.message });
  }
};

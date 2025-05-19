const TrackingUpdate = require('../models/trackingUpdate');
const Delivery = require('../models/deliveries');
const { exportLatestTrackingStatus } = require("../Apis/exportTrackingToSheet");

exports.getAllTrackingUpdates = async (req, res) => {
    try {
        const updates = await TrackingUpdate.findAll({
            include: { model: Delivery }
        });
        res.status(200).json(updates);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tracking updates', error });
    }
};


exports.getTrackingUpdateById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const update = await TrackingUpdate.findByPk(id, {
            include: { model: Delivery }
        });

        if (!update) {
           
            return res.status(404).json({ message: 'No tracking update found' });
        }

        res.status(200).json(update);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tracking update', error });
    }
};


exports.getUpdatesByDeliveryId = async (req, res) => {
    try {
        const updates = await TrackingUpdate.findAll({
            where: { delivery_id: req.params.deliveryId }
        });
        res.status(200).json(updates);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving updates for delivery', error });
    }
};





exports.createTrackingUpdate = async (req, res) => {
    try {
        const { delivery_id, update_message, status } = req.body;

        const delivery = await Delivery.findByPk(delivery_id);
        if (!delivery) {
            return res.status(404).json({  
                message: `No delivery found with ID ${delivery_id}`
            });
        }

        const newUpdate = await TrackingUpdate.create({
            delivery_id,
            update_message,
            status
        });

        await delivery.update({ delivery_status: status });

        res.status(201).json({
            status: 'success',
            message: 'Tracking update created successfully',
            data: newUpdate
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error creating tracking update',
            error
        });
    }
};




exports.updateTrackingUpdate = async (req, res) => {
    try {
        const update = await TrackingUpdate.findByPk(req.params.id);
        if (!update) {
            return res.status(404).json({
                message: 'No tracking update found to update'
            });
        }

        const { update_message, status } = req.body;

      
        await update.update({ update_message, status });

        
        const delivery = await Delivery.findByPk(update.delivery_id);
        if (delivery) {
            await delivery.update({ delivery_status: status });
        }

        res.status(200).json(update);
    } catch (error) {
        res.status(500).json({ message: 'Error updating tracking update', error });
    }
};





exports.deleteTrackingUpdate = async (req, res) => {
    try {
        const update = await TrackingUpdate.findByPk(req.params.id);

        if (!update) {
            return res.status(404).json({
                message: 'No tracking update found to delete'
            });
        }

        await update.destroy();
        res.status(200).json({ message: 'Tracking update deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting tracking update', error });
    }
};



exports.exportToGoogleSheet = async (req, res) => {
  const result = await exportLatestTrackingStatus();

  if (result.success) {
    res.status(200).json({
      message: "Tracking updates exported to Google Sheets successfully."
    });
  } else {
    res.status(500).json({
      message: "Export failed.",
      error: result.error
    });
  }
};

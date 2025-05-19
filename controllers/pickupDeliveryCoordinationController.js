const PickupDeliveryCoordination = require("../models/pickup_delivery_coordination");
const Delivery = require("../models/deliveries");
const User = require("../models/Users");



exports.createCoordination = async (req, res) => {
    try {
        const {
            delivery_id,
            pickup_by,
            delivery_by,
            pickup_location,
            delivery_location,
            status,
            scheduled_pickup_time,
            scheduled_delivery_time,
            actual_pickup_time,
            actual_delivery_time
        } = req.body;

        
        const delivery = await Delivery.findByPk(delivery_id);
        if (!delivery) {
            return res.status(400).json({ message: `Delivery with ID ${delivery_id} not found.` });
        }

       
        const pickupUser = await User.findByPk(pickup_by);
        if (!pickupUser) {
            return res.status(400).json({ message: `Pickup user with ID ${pickup_by} not found.` });
        }

        
        const deliveryUser = await User.findByPk(delivery_by);
        if (!deliveryUser) {
            return res.status(400).json({ message: `Delivery user with ID ${delivery_by} not found.` });
        }

        
        if (pickup_by === delivery_by) {
            return res.status(400).json({ message: `Pickup and Delivery users cannot be the same.` });
        }

       
        if (pickupUser.role !== 'Volunteer' || deliveryUser.role !== 'Volunteer') {
            return res.status(400).json({ message: `Both pickup_by and delivery_by must be users with role 'Volunteer'.` });
        }

        
        const coordination = await PickupDeliveryCoordination.create({
            delivery_id,
            pickup_by,
            delivery_by,
            pickup_location,
            delivery_location,
            status,
            scheduled_pickup_time,
            scheduled_delivery_time,
            actual_pickup_time,
            actual_delivery_time
        });

        res.status(201).json({
            message: "Pickup & Delivery coordination created successfully.",
            id: coordination.id
        });
    } catch (error) {
        console.error("Error creating coordination:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.getAllCoordinations = async (req, res) => {
    try {
        const coordinations = await PickupDeliveryCoordination.findAll();
        res.status(200).json(coordinations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getCoordinationById = async (req, res) => {
    try {
        const id = req.params.id;
        const coordination = await PickupDeliveryCoordination.findByPk(id);

        if (!coordination) {
            return res.status(404).json({ message: `Coordination with ID ${id} not found.` });
        }

        res.status(200).json(coordination);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateCoordination = async (req, res) => {
    try {
        const id = req.params.id;

        const coordination = await PickupDeliveryCoordination.findByPk(id);
        if (!coordination) {
            return res.status(404).json({ message: `Coordination with ID ${id} not found.` });
        }

        await coordination.update(req.body);

        res.status(200).json({
            message: "Coordination updated successfully.",
            id: coordination.id
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.deleteCoordination = async (req, res) => {
    try {
        const id = req.params.id;
        const coordination = await PickupDeliveryCoordination.findByPk(id);

        if (!coordination) {
            return res.status(404).json({ message: `Coordination with ID ${id} not found.` });
        }

        await coordination.destroy();

        res.status(200).json({ message: "Coordination deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

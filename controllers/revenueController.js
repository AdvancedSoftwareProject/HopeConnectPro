const Revenue = require("../models/revenue");
const Donation = require("../models/donations");
const Sponsorship = require("../models/sponsorships");
const Organization = require("../models/organizations");
const EmergencyDonation = require("../models/emergency_donations");
const { generateRevenueChart } = require("../Apis/externalRevenueChart");

exports.createRevenue = async (req, res) => {
    try {
        const {
            amount,
            source,
            donation_id,
            sponsorship_id,
            partnership_id,
            emergency_donation_id,
            orphanage_id
        } = req.body;

        let sourceExists = false;

        switch (source) {
            case "Donation":
                sourceExists = await Donation.findByPk(donation_id);
                break;
            case "Sponsorship":
                sourceExists = await Sponsorship.findByPk(sponsorship_id);
                break;
            case "Partnership":
                sourceExists = await Organization.findByPk(partnership_id);
                break;
            case "Emergency Campaign":
                sourceExists = await EmergencyDonation.findByPk(emergency_donation_id);
                break;
            default:
                return res.status(400).json({ message: "Invalid source type." });
        }

        if (!sourceExists) {
            return res.status(404).json({
                message: `No ${source} found with the provided ID. Revenue not recorded.`
            });
        }

        const newRevenue = await Revenue.create({
            amount,
            source,
            donation_id,
            sponsorship_id,
            partnership_id,
            emergency_donation_id,
            orphanage_id
        });

        res.status(201).json({
            message: "Revenue entry created successfully.",
            id: newRevenue.id
        });

    } catch (error) {
        console.error("Error creating revenue:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.getAllRevenues = async (req, res) => {
    try {
        const revenues = await Revenue.findAll();
        res.status(200).json(revenues);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getRevenueById = async (req, res) => {
    try {
        const id = req.params.id;
        const revenue = await Revenue.findByPk(id);

        if (!revenue) {
            return res.status(404).json({
                message: `No revenue entry found with ID ${id}.`
            });
        }

        res.status(200).json(revenue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.updateRevenue = async (req, res) => {
    const id = req.params.id;
    const {
        amount,
        source,
        donation_id,
        sponsorship_id,
        partnership_id,
        emergency_donation_id,
        orphanage_id
    } = req.body;

    try {
        const revenue = await Revenue.findByPk(id);

        if (!revenue) {
            return res.status(404).json({ message: "Revenue entry not found" });
        }

       
        revenue.amount = amount;
        revenue.source = source;
        revenue.donation_id = donation_id;
        revenue.sponsorship_id = sponsorship_id;
        revenue.partnership_id = partnership_id;
        revenue.emergency_donation_id = emergency_donation_id;
        revenue.orphanage_id = orphanage_id;

      
        await revenue.save();

        res.status(200).json({
            message: "Revenue entry updated successfully",
            id: revenue.id
        });
    } catch (error) {
        console.error("Error updating revenue:", error);
        res.status(500).json({ error: error.message });
    }
};





exports.deleteRevenue = async (req, res) => {
    const id = req.params.id;

    try {
        const revenue = await Revenue.findByPk(id);

        if (!revenue) {
            return res.status(404).json({ message: "Revenue entry not found" });
        }

        await revenue.destroy();

        res.status(200).json({ message: "Revenue entry deleted successfully", id: id });
    } catch (error) {
        console.error("Error deleting revenue:", error);
        res.status(500).json({ error: error.message });
    }
};



exports.getRevenueChartUrl = async (req, res) => {
  const result = await generateRevenueChart();

  if (result.success) {
    return res.status(200).json({
      message: "Revenue chart generated successfully.",
      chartUrl: result.chartUrl
    });
  } else {
    return res.status(500).json({
      message: "Failed to generate chart.",
      error: result.error
    });
  }
};

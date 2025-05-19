const TransactionFee = require("../models/transaction_fees");



exports.createTransactionFee = async (req, res) => {
    try {
        const { donation_id, fee_percentage, fee_amount } = req.body;

        const newFee = await TransactionFee.create({
            donation_id,
            fee_percentage,
            fee_amount,
        });

        res.status(201).json({
            message: "Transaction fee created",
            id: newFee.id,
        });
    } catch (error) {
        console.error("Error creating transaction fee:", error);
        res.status(500).json({ message: "Error creating transaction fee", error: error.message });
    }
};


exports.getAllTransactionFees = async (req, res) => {
    try {
        const fees = await TransactionFee.findAll();
        res.json(fees);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving transaction fees", error: error.message });
    }
};


exports.getTransactionFeeById = async (req, res) => {
    try {
        const id = req.params.id;
        const fee = await TransactionFee.findByPk(id);

        if (!fee) {
            return res.status(404).json({ message: "Transaction fee not found" });
        }

        res.json(fee);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving transaction fee", error: error.message });
    }
};


exports.updateTransactionFee = async (req, res) => {
    try {
        const id = req.params.id;
        const { fee_percentage, fee_amount } = req.body;

        const [updated] = await TransactionFee.update(
            { fee_percentage, fee_amount },
            { where: { id } }
        );

        if (!updated) {
            return res.status(404).json({ message: "Transaction fee not found" });
        }

        res.json({ message: "Transaction fee updated" });
    } catch (error) {
        res.status(500).json({ message: "Error updating transaction fee", error: error.message });
    }
};


exports.deleteTransactionFee = async (req, res) => {
    try {
        const id = req.params.id;

        const deleted = await TransactionFee.destroy({ where: { id } });

        if (!deleted) {
            return res.status(404).json({ message: "Transaction fee not found" });
        }

        res.json({ message: "Transaction fee deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting transaction fee", error: error.message });
    }
};

const DonorFeedback = require('../models/donor_feedback');
const { analyzeFeedback } = require('../Apis/feedbackAnalysis');

exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await DonorFeedback.findAll();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching feedbacks', error: err.message });
  }
};


exports.createFeedback = async (req, res) => {
  try {
    const { donor_id, organization_id, rating, review_content } = req.body;
    
    
    if (!donor_id || !organization_id || !rating) {
      return res.status(400).json({ 
        message: 'Missing required fields', 
        details: 'donor_id, organization_id, and rating are required' 
      });
    }
    
   
    const newFeedback = await DonorFeedback.create(req.body);
    
    
    let analysis = null;
    if (review_content && review_content.trim().length > 0) {
      analysis = await analyzeFeedback(review_content);
    }
    
    
    res.status(201).json({
      message: 'Feedback created successfully',
      feedback: newFeedback,
      analysis: analysis && analysis.success ? analysis.analysis : null
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create feedback', error: err.message });
  }
};


exports.getFeedbackWithAnalysis = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await DonorFeedback.findByPk(id);
    
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    
    
    let analysis = null;
    if (feedback.review_content && feedback.review_content.trim().length > 0) {
      analysis = await analyzeFeedback(feedback.review_content);
    }
    
   
    res.status(200).json({
      feedback,
      analysis: analysis && analysis.success ? analysis.analysis : null
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching feedback', error: err.message });
  }
};

exports.updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await DonorFeedback.findByPk(id);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    if (req.user.role === 'Donor' && req.user.id !== feedback.donor_id) {
      return res.status(403).json({ message: 'You can only update your own feedback' });
    }

    await feedback.update(req.body);
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: 'Error updating feedback', error: err.message });
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await DonorFeedback.findByPk(id);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    if (req.user.role === 'Donor' && req.user.id !== feedback.donor_id) {
      return res.status(403).json({ message: 'You can only delete your own feedback' });
    }

    await feedback.destroy();
    res.json({ message: 'Feedback deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting feedback', error: err.message });
  }
};


exports.analyzeFeedback = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "Text is required for analysis." });
    }

    const result = await analyzeFeedback(text);

    res.status(200).json({
      message: "Feedback analyzed successfully",
      ...result
    });

  } catch (error) {
    console.error("❌ Error analyzing feedback:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

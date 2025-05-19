const axios = require('axios');
require('dotenv').config();

const analyzeDonorFeedback = async (text) => {
  try {
    const useRealAPI = process.env.USE_REAL_SENTIMENT_API === 'true';

    if (useRealAPI) {
      const apiKey = process.env.GOOGLE_CLOUD_API_KEY;
      if (!apiKey) throw new Error('Google Cloud API key not configured');

      const document = {
        document: { type: 'PLAIN_TEXT', content: text },
        encodingType: 'UTF8'
      };

      const [sentimentRes, entityRes] = await Promise.all([
        axios.post(`https://language.googleapis.com/v1/documents:analyzeSentiment?key=${apiKey}`, document),
        axios.post(`https://language.googleapis.com/v1/documents:analyzeEntities?key=${apiKey}`, document)
      ]);

      const score = sentimentRes.data.documentSentiment.score;
      const magnitude = sentimentRes.data.documentSentiment.magnitude;
      const normalizedScore = ((score + 1) / 2) * 10;
      const label = normalizedScore > 7 ? 'Positive' : normalizedScore < 3 ? 'Negative' : 'Neutral';

      const entities = (entityRes.data.entities || [])
        .filter(e => e.salience > 0.1)
        .map(e => e.name.toLowerCase())
        .slice(0, 3);

      return {
        success: true,
        sentiment: {
          score: parseFloat(normalizedScore.toFixed(1)),
          label,
          confidence: magnitude
        },
        topics: entities.length ? entities : ['general feedback'],
        source: 'Google NLP',
        mock: false
      };
    } else {
      console.log('Using mock donor feedback analysis');

      const words = text.toLowerCase().split(/\s+/);
      const positives = ['good', 'great', 'amazing', 'happy', 'helpful'];
      const negatives = ['bad', 'poor', 'sad', 'angry', 'issue'];

      let score = 5;
      words.forEach(w => {
        if (positives.includes(w)) score += 1;
        if (negatives.includes(w)) score -= 1;
      });

      score = Math.max(0, Math.min(10, score));
      const label = score > 7 ? 'Positive' : score < 3 ? 'Negative' : 'Neutral';

      const topics = [];
      if (text.includes('donation')) topics.push('donation');
      if (text.includes('website')) topics.push('website');

      return {
        success: true,
        sentiment: {
          score,
          label,
          confidence: 0.85
        },
        topics: topics.length ? topics : ['general feedback'],
        source: 'Mock',
        mock: true
      };
    }
  } catch (error) {
    console.error('Donor Feedback Error:', error.message);
    return {
      success: false,
      error: 'Failed to analyze donor feedback',
      details: error.message
    };
  }
};

module.exports = { analyzeDonorFeedback };


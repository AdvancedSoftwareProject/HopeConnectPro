const axios = require('axios');
require('dotenv').config();

/**
 * Analyze feedback text for sentiment and key topics
 * @param {string} text - The feedback text to analyze
 * @returns {Promise<Object>} - Analysis results
 */
const analyzeFeedback = async (text) => {
  try {
   
    const useRealAPI = process.env.USE_REAL_SENTIMENT_API === 'true';
    
    if (useRealAPI) {
     
      const apiKey = process.env.GOOGLE_CLOUD_API_KEY;
      
      if (!apiKey) {
        throw new Error('Google Cloud API key not configured');
      }
      
      const url = `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${apiKey}`;
      
      const response = await axios.post(url, {
        document: {
          type: 'PLAIN_TEXT',
          content: text
        },
        encodingType: 'UTF8'
      });
      
      const data = response.data;
      
      
      const entitiesUrl = `https://language.googleapis.com/v1/documents:analyzeEntities?key=${apiKey}`;
      const entitiesResponse = await axios.post(entitiesUrl, {
        document: {
          type: 'PLAIN_TEXT',
          content: text
        },
        encodingType: 'UTF8'
      });
      
     
      const entities = entitiesResponse.data.entities || [];
      const topics = entities
        .filter(entity => entity.salience > 0.1)
        .map(entity => entity.name.toLowerCase())
        .slice(0, 3); 
      
      
      const googleScore = data.documentSentiment.score;
      const normalizedScore = ((googleScore + 1) / 2) * 10;
      
     
      let sentimentLabel = 'Neutral';
      if (normalizedScore > 7) sentimentLabel = 'Positive';
      else if (normalizedScore < 3) sentimentLabel = 'Negative';
      
      return {
        success: true,
        analysis: {
          sentiment: {
            score: parseFloat(normalizedScore.toFixed(1)),
            label: sentimentLabel,
            confidence: data.documentSentiment.magnitude,
            rawScore: googleScore
          },
          topics: topics.length > 0 ? topics : ['general feedback'],
          summary: generateSummary(text, normalizedScore),
          wordCount: text.split(/\s+/).length,
          language: data.language || 'en'
        }
      };
    } else {
      
      console.log('Using mock sentiment analysis');
      
    
      const words = text.toLowerCase().split(/\s+/);
      const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'happy', 'satisfied', 'helpful', 'impressed'];
      const negativeWords = ['bad', 'poor', 'terrible', 'awful', 'disappointed', 'unhappy', 'unsatisfied', 'issue', 'problem'];
      
      let positiveCount = 0;
      let negativeCount = 0;
      
      words.forEach(word => {
        if (positiveWords.includes(word)) positiveCount++;
        if (negativeWords.includes(word)) negativeCount++;
      });
      
      const totalWords = words.length;
      const sentimentScore = totalWords > 0 
        ? ((positiveCount - negativeCount) / totalWords) * 5 + 5 
        : 5; 
  
      const topics = [];
      if (text.toLowerCase().includes('donation')) topics.push('donation process');
      if (text.toLowerCase().includes('website')) topics.push('website experience');
      if (text.toLowerCase().includes('support') || text.toLowerCase().includes('help')) topics.push('customer support');
      if (text.toLowerCase().includes('impact') || text.toLowerCase().includes('difference')) topics.push('impact reporting');
      
      return {
        success: true,
        analysis: {
          sentiment: {
            score: parseFloat(sentimentScore.toFixed(1)),
            label: sentimentScore > 7 ? 'Positive' : sentimentScore < 3 ? 'Negative' : 'Neutral',
            confidence: 0.85
          },
          topics: topics.length > 0 ? topics : ['general feedback'],
          summary: generateSummary(text, sentimentScore),
          wordCount: totalWords,
          language: 'en',
          mockAnalysis: true
        }
      };
    }
  } catch (error) {
    console.error('Feedback analysis error:', error.message);
    return {
      success: false,
      error: 'Failed to analyze feedback',
      details: error.message
    };
  }
};

/**
 * Generate a summary based on sentiment score and text
 * @param {string} text - Original feedback text
 * @param {number} score - Sentiment score
 * @returns {string} - Generated summary
 */
function generateSummary(text, score) {
  // Truncate text if too long
  const shortText = text.length > 100 ? text.substring(0, 100) + '...' : text;
  
  if (score > 7) {
    return `Positive feedback: "${shortText}"`;
  } else if (score < 3) {
    return `Negative feedback: "${shortText}"`;
  } else {
    return `Neutral feedback: "${shortText}"`;
  }
}

module.exports = { analyzeFeedback };

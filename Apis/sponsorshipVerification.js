const axios = require('axios');
require('dotenv').config();

/**
 * Verify sponsorship eligibility using Stripe
 * @param {string} sponsorId - The sponsor's ID
 * @param {number} amount - The sponsorship amount
 * @param {string} orphanId - The orphan's ID
 * @returns {Promise<Object>} - Verification results
 */
const verifySponsorshipEligibility = async (sponsorId, amount, orphanId) => {
  try {
    const useRealAPI = process.env.USE_REAL_SPONSORSHIP_API === 'true';
    
    if (useRealAPI) {
      const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
      
      if (!stripeSecretKey) {
        throw new Error('Stripe secret key not configured');
      }
      
      
      let customerResponse;
      try {
      
        customerResponse = await axios.get(
          `https://api.stripe.com/v1/customers/${sponsorId}`,
          {
            headers: {
              'Authorization': `Bearer ${stripeSecretKey}`
            }
          }
        );
      } catch (error) {
       
        if (error.response && error.response.status === 404) {
          customerResponse = await axios.post(
            'https://api.stripe.com/v1/customers',
            `description=Sponsor ID: ${sponsorId}`,
            {
              headers: {
                'Authorization': `Bearer ${stripeSecretKey}`,
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }
          );
        } else {
          throw error;
        }
      }
      
     
      const response = await axios.post(
        'https://api.stripe.com/v1/payment_intents',
        `amount=${Math.round(amount * 100)}&currency=usd&customer=${customerResponse.data.id}&metadata[orphanId]=${orphanId}&confirm=false`,
        {
          headers: {
            'Authorization': `Bearer ${stripeSecretKey}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      
      return {
        eligible: true,
        details: {
          status: 'approved',
          reason: 'Payment intent created successfully',
          timestamp: new Date().toISOString(),
          stripeCustomerId: customerResponse.data.id,
          stripePaymentIntentId: response.data.id
        },
        verificationId: response.data.id
      };
    } else {
      console.log('Using mock sponsorship verification');
      
      const eligible = amount >= 50 && !sponsorId.toString().startsWith('ineligible');
      
      return {
        eligible,
        details: {
          status: eligible ? 'approved' : 'rejected',
          reason: eligible ? 'Meets eligibility criteria' : 'Insufficient amount or ineligible sponsor',
          timestamp: new Date().toISOString()
        },
        verificationId: `mock-${Date.now()}`,
        mock: true
      };
    }
  } catch (error) {
    console.error('Sponsorship verification error:', error.message);
    return {
      eligible: false,
      error: 'Failed to verify sponsorship eligibility',
      details: error.message
    };
  }
};

module.exports = { verifySponsorshipEligibility };


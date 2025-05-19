const axios = require('axios');
require('dotenv').config();


const verifyPayment = async (transactionId, amount) => {
  try {
    
    const useRealAPI = process.env.USE_REAL_PAYMENT_API === 'true';
    
    if (useRealAPI) {
      
      const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
      
      if (!stripeSecretKey) {
        throw new Error('Stripe secret key not configured');
      }
      
      
      const response = await axios.get(
        `https://api.stripe.com/v1/payment_intents/${transactionId}`,
        {
          headers: {
            'Authorization': `Bearer ${stripeSecretKey}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      
      const paymentData = response.data;
      
    
      const amountInCents = Math.round(amount * 100); 
      const verified = 
        paymentData.status === 'succeeded' && 
        paymentData.amount === amountInCents &&
        paymentData.currency.toLowerCase() === 'usd';
      
      if (verified) {
        return {
          verified: true,
          donationId: transactionId,
          details: {
            status: paymentData.status,
            paymentMethod: paymentData.payment_method_types[0],
            processingDate: new Date(paymentData.created * 1000).toISOString(),
            currency: paymentData.currency.toUpperCase(),
            amount: paymentData.amount / 100, 
            stripeId: paymentData.id
          }
        };
      } else {
        return {
          verified: false,
          error: 'Payment verification failed',
          details: {
            expectedAmount: amount,
            actualAmount: paymentData.amount / 100,
            status: paymentData.status
          }
        };
      }
    } else {
    
      console.log('Using mock payment verification');
      
     
    
      if (transactionId.toString().toLowerCase().startsWith('fail')) {
        return {
          verified: false,
          error: 'Payment verification failed',
          details: {
            status: 'failed',
            reason: 'Test failure scenario'
          }
        };
      }
      
      
      return {
        verified: true,
        donationId: transactionId,
        details: {
          status: 'success',
          paymentMethod: 'credit_card',
          processingDate: new Date().toISOString(),
          currency: 'USD',
          amount,
          mockTransaction: true
        }
      };
    }
  } catch (error) {
    console.error('Payment verification error:', error.message);
    return { 
      verified: false, 
      error: 'Failed to verify payment',
      details: error.message
    };
  }
};

module.exports = { verifyPayment };



const https = require('https');
const querystring = require('querystring');
const { sendConsultationEmail, sendStrategyCallEmail, sendUserConfirmationEmail } = require('../service/emailService');

function verifyRecaptcha(token) {
  return new Promise((resolve, reject) => {
    const params = querystring.stringify({
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: token,
    });
    const options = {
      hostname: 'www.google.com',
      port: 443,
      path: '/recaptcha/api/siteverify',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(params),
      },
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(params);
    req.end();
  });
}

/**
 * Handle main contact/consultation form (Image 1)
 */
async function handleConsultation(req, res) {
  try {
    const { firstName, lastName, email, practiceName, specialty, goals, recaptchaToken } = req.body;

    if (!recaptchaToken) {
      return res.status(400).json({ success: false, message: 'reCAPTCHA verification missing.' });
    }
    const captcha = await verifyRecaptcha(recaptchaToken);
    if (!captcha.success) {
      return res.status(400).json({ success: false, message: 'reCAPTCHA verification failed. Please try again.' });
    }

    if (!firstName || !lastName || !email || !practiceName || !specialty) {
      return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
    }

    await sendConsultationEmail({ firstName, lastName, email, practiceName, specialty, goals });

    // Send confirmation email to the user
    await sendUserConfirmationEmail({ email, name: `${firstName} ${lastName}` });

    res.json({ success: true, message: 'Your consultation request has been sent successfully!' });
  } catch (error) {
    console.error('Consultation email error:', error);
    res.status(500).json({ success: false, message: 'Failed to send your request. Please try again.' });
  }
}

/**
 * Handle popup strategy call form (Image 2)
 */
async function handleStrategyCall(req, res) {
  try {
    const { name, practiceName, email, phone, recaptchaToken } = req.body;

    if (!recaptchaToken) {
      return res.status(400).json({ success: false, message: 'reCAPTCHA verification missing.' });
    }
    const captcha = await verifyRecaptcha(recaptchaToken);
    if (!captcha.success) {
      return res.status(400).json({ success: false, message: 'reCAPTCHA verification failed. Please try again.' });
    }

    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Please provide your name and email.' });
    }

    await sendStrategyCallEmail({ name, practiceName, email, phone });

    // Send confirmation email to the user
    await sendUserConfirmationEmail({ email, name });

    res.json({ success: true, message: 'Your strategy call request has been sent successfully!' });
  } catch (error) {
    console.error('Strategy call email error:', error);
    res.status(500).json({ success: false, message: 'Failed to send your request. Please try again.' });
  }
}

module.exports = { handleConsultation, handleStrategyCall };

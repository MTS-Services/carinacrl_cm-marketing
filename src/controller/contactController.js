const { sendConsultationEmail, sendStrategyCallEmail, sendUserConfirmationEmail } = require('../service/emailService');

/**
 * Handle main contact/consultation form (Image 1)
 */
async function handleConsultation(req, res) {
  try {
    const { firstName, lastName, email, practiceName, specialty, goals } = req.body;

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
    const { name, practiceName, email, phone } = req.body;

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

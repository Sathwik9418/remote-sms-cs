require('dotenv').config(); // Load environment variables from .env file
const twilio = require('twilio');

// Use environment variables for sensitive data
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

const sendSMS = (req, res) => {
    const { command, to } = req.body;

    console.log(`Received request to send SMS: Command: "${command}", To: "${to}"`);

    if (!to || !command) {
        return res.status(400).json({ success: false, message: 'To and command are required' });
    }

    client.messages
        .create({
            body: command,
            from: process.env.TWILIO_PHONE_NUMBER, // Use Twilio phone number from environment variables
            to: to,
        })
        .then(message => {
            console.log(`SMS sent: ${message.sid}`);
            res.json({ success: true, message: `SMS sent to ${to}` });
        })
        .catch(error => {
            console.error('Error sending SMS:', error.message);
            res.status(500).json({ success: false, message: 'Failed to send SMS', error: error.message });
        });
};

module.exports = { sendSMS };

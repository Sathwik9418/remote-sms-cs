const twilio = require('twilio');

const accountSid = 'ACe305f70b83d9d94b2b46be95da7dde03';
const authToken = '842b411ffc59b08922244646f5227bc6';
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
            from: '+18435074625', // Your Twilio phone number
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

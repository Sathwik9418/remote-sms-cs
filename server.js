const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const twilio = require('twilio'); // Import Twilio

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define routes to serve specific HTML pages
app.get('/locate', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'locate.html'));
});

app.get('/contacts', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contacts.html'));
});

app.get('/sound', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sound.html'));
});

app.get('/lock', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'lock.html'));
});

app.get('/unlock', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'unlock.html'));
});

// Twilio credentials
const accountSid = 'AC0d3e38210a7ede3d57e89a2682295907'; // Replace with your Twilio Account SID
const authToken = 'f246e6aa25a3200baf842990c3c04772'; // Replace with your Twilio Auth Token
const twilioPhoneNumber = '+17164423172'; // Replace with your Twilio phone number

const client = twilio(accountSid, authToken);

// API Route for sending SMS
app.post('/api/sms/send', (req, res) => {
    const { to, command } = req.body;

    client.messages
        .create({
            body: command,
            from: twilioPhoneNumber,
            to: to
        })
        .then(message => {
            res.json({ success: true, message: 'SMS sent successfully!', sid: message.sid });
        })
        .catch(error => {
            console.error('Error sending SMS:', error);
            res.status(500).json({ success: false, message: 'Failed to send SMS', error: error.message });
        });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// POST /api/contact - Save a new contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const contact = new Contact({ name, email, message });
    await contact.save();

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Configure email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'harshvardhanjha338@gmail.com', // Your receiving email address
      replyTo: email,
      subject: `Portfolio Contact: Message from ${name}`,
      text: `You have a new message from your portfolio website.\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #2c2c2c;">New Portfolio Message</h2>
          <p><strong>From:</strong> ${name} (<a href="mailto:${email}">${email}</a>)</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="white-space: pre-wrap; color: #4a4a4a; line-height: 1.6;">${message}</p>
        </div>
      `,
    };

    // Send the email
    try {
      await transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully');
    } catch (mailError) {
      console.error('❌ Email sending failed:', mailError);
      // We don't return an error to the frontend if the email fails, 
      // as long as the message was successfully saved to the database.
    }

    res.status(201).json({
      success: true,
      message: 'Message received successfully!',
      data: { id: contact._id },
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: errors.join(', ') });
    }
    console.error('Contact save error:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// GET /api/contact - Retrieve all messages (admin)
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (err) {
    console.error('Contact fetch error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

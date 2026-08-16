const Message = require('../models/Message');

// POST /api/messages
async function createMessage(req, res) {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are all required',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address',
      });
    }

    const savedMessage = await Message.create({ name, email, message });

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully',
      data: savedMessage,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    console.error('Error saving message:', err.message);
    res.status(500).json({ success: false, message: 'Server error while sending message' });
  }
}

module.exports = { createMessage };

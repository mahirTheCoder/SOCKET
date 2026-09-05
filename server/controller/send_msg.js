const massageSchema = require("../model/massageSchema");

const sendMessage = async (req, res) => {
  try {
    const { sender, text } = req.body;

    if (!sender || !text) {
      return res.status(400).json({
        success: false,
        message: "Sender and text are required",
      });
    }

    const newMessage = await massageSchema.create({
      sender,
      text,
    });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to send message",
      error: error.message,
    });
  }
};

module.exports = { sendMessage };
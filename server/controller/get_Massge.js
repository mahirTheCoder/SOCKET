const massageSchema = require("../model/massageSchema");

const getMessages = async (req, res) => {
  try {
    const messages = await massageSchema.find({}).sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get messages",
      error: error.message,
    });
  }
};
 
module.exports = { getMessages };

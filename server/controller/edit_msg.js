const massageSchema = require("../model/massageSchema");

const editMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { text } = req.body;

    const updatedMessage = await massageSchema.findByIdAndUpdate(
      messageId,
      {
        text,
        isEdited: true,
      },
      {
        returnDocument: "after",
      },
    );

    if (!updatedMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message updated successfully",
      data: updatedMessage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to edit message",
      error: error.message,
    });
  }
};

module.exports = { editMessage };

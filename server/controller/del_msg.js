const massageSchema = require("../model/massageSchema");

const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;

    const deletedMessage = await massageSchema.findByIdAndUpdate(
      messageId,
      {
        isDeleted: true,
        text: "This message was deleted",
      },
      {
        returnDocument: "after",
      },
    );

    if (!deletedMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully",
      data: deletedMessage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete message",
      error: error.message,
    });
  }
};

module.exports = { deleteMessage };

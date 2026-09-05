const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      required: true,
      trim: true,
    },

    receiver: {
      type: String,
      trim: true,
      default: "public",
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },

    isEdited: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


module.exports =  mongoose.model("users", messageSchema);
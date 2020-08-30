const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
    unique: true,
    trim: true,
    maxlength: [50, "Title cannot be more than 50 Characters"],
  },
  description: {
    type: String,
    required: true,
    maxlength: [250, "Description cannot be more than 250 Characters"],
  },
});

module.exports = mongoose.models.Note || mongoose.model("Note", NoteSchema);

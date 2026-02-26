const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: [true, 'Question text is required.'],
    trim: true,
    minlength: [10, 'Question must be at least 10 characters.'],
    maxlength: [300, 'Question cannot exceed 300 characters.'],
  },
  category: {
    type: String,
    required: [true, 'Category is required.'],
    trim: true,
    maxlength: [50, 'Category cannot exceed 50 characters.'],
    match: [/^[a-zA-Z\s+#]+$/, 'Category can only contain letters.'],
  },
  difficulty: {
    type: String,
    required: [true, 'Difficulty is required.'],
    enum: {
      values: ['Easy', 'Medium', 'Hard'],
      message: 'Difficulty must be Easy, Medium, or Hard.',
    },
  },
  answer: {
    type: String,
    required: [true, 'Answer is required.'],
    trim: true,
    minlength: [20, 'Answer must be at least 20 characters.'],
    maxlength: [2000, 'Answer cannot exceed 2000 characters.'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Question', questionSchema);

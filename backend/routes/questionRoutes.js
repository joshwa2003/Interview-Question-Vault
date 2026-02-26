const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const validateInput = (body) => {
    const { questionText, category, difficulty, answer } = body;
    if (!questionText || !questionText.trim()) return 'Question text is required.';
    if (!category || !category.trim()) return 'Category is required.';
    if (!difficulty) return 'Difficulty is required.';
    if (!['Easy', 'Medium', 'Hard'].includes(difficulty)) return 'Difficulty must be Easy, Medium, or Hard.';
    if (!answer || !answer.trim()) return 'Answer is required.';
    return null;
};

router.get('/', async (req, res) => {
    try {
        const filter = {};
        if (req.query.category) {
            filter.category = { $regex: new RegExp(`^${req.query.category}$`, 'i') };
        }

        const questions = await Question.find(filter).sort({ createdAt: -1 });
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching questions.', error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const validationError = validateInput(req.body);
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }

        const { questionText, category, difficulty, answer } = req.body;

        const newQuestion = new Question({ questionText, category, difficulty, answer });
        const saved = await newQuestion.save();

        res.status(201).json(saved);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((e) => e.message);
            return res.status(400).json({ message: messages.join(' ') });
        }
        res.status(500).json({ message: 'Error adding question.', error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const validationError = validateInput(req.body);
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }

        const { questionText, category, difficulty, answer } = req.body;

        const updated = await Question.findByIdAndUpdate(
            req.params.id,
            { questionText, category, difficulty, answer },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ message: 'Question not found.' });
        }

        res.status(200).json(updated);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((e) => e.message);
            return res.status(400).json({ message: messages.join(' ') });
        }
        res.status(500).json({ message: 'Error updating question.', error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Question.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: 'Question not found.' });
        }

        res.status(200).json({ message: 'Question deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting question.', error: error.message });
    }
});

module.exports = router;

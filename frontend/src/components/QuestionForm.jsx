import { useState, useEffect } from 'react';

const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

const RULES = {
    questionText: { min: 10, max: 300 },
    category: { pattern: /^[a-zA-Z\s+#]+$/ },
    answer: { min: 20, max: 2000 },
};

function QuestionForm({ onSubmit, editData, onCancel }) {
    const [formData, setFormData] = useState({
        questionText: '',
        category: '',
        difficulty: 'Easy',
        answer: '',
    });

    const [errors, setErrors] = useState({});

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (editData) {
            setFormData({
                questionText: editData.questionText,
                category: editData.category,
                difficulty: editData.difficulty,
                answer: editData.answer,
            });
        } else {
            setFormData({ questionText: '', category: '', difficulty: 'Easy', answer: '' });
        }
        setErrors({});
    }, [editData]);

    const validateField = (name, value) => {
        const trimmed = value.trim();

        if (!trimmed) return 'This field is required.';

        if (name === 'questionText') {
            if (trimmed.length < RULES.questionText.min)
                return `Question must be at least ${RULES.questionText.min} characters.`;
            if (trimmed.length > RULES.questionText.max)
                return `Question cannot exceed ${RULES.questionText.max} characters.`;
        }

        if (name === 'category') {
            if (!RULES.category.pattern.test(trimmed))
                return 'Category can only contain letters (e.g. DSA, React, C++).';
        }

        if (name === 'answer') {
            if (trimmed.length < RULES.answer.min)
                return `Answer must be at least ${RULES.answer.min} characters.`;
            if (trimmed.length > RULES.answer.max)
                return `Answer cannot exceed ${RULES.answer.max} characters.`;
        }

        return '';
    };

    const validateAll = () => {
        const newErrors = {};
        ['questionText', 'category', 'answer'].forEach((field) => {
            const msg = validateField(field, formData[field]);
            if (msg) newErrors[field] = msg;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };
    const handleBlur = (e) => {
        const { name, value } = e.target;
        const msg = validateField(name, value);
        setErrors({ ...errors, [name]: msg });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateAll()) return;

        setIsSubmitting(true);

        const sanitizedData = {
            ...formData,
            questionText: formData.questionText.trim(),
            category: formData.category.trim().toUpperCase(),
            answer: formData.answer.trim(),
        };

        await onSubmit(sanitizedData);

        setIsSubmitting(false);

        if (!editData) {
            setFormData({ questionText: '', category: '', difficulty: 'Easy', answer: '' });
            setErrors({});
        }
    };

    const answerLength = formData.answer.trim().length;

    const isNearLimit = answerLength > RULES.answer.max - 100;
    const charCountClass = isNearLimit ? 'char-count char-count-warn' : 'char-count';

    return (
        <div className="form-container">
            <h2>{editData ? 'Edit Question' : 'Add New Question'}</h2>
            <form onSubmit={handleSubmit} noValidate>

                <input
                    type="text"
                    name="questionText"
                    placeholder="Enter your question... (min 10 characters)"
                    value={formData.questionText}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.questionText ? 'input-error' : ''}
                />
                {errors.questionText && <p className="error-msg">{errors.questionText}</p>}

                <input
                    type="text"
                    name="category"
                    placeholder="Category (e.g. DSA, React, System Design)"
                    value={formData.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.category ? 'input-error' : ''}
                />
                {errors.category && <p className="error-msg">{errors.category}</p>}

                <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
                    {DIFFICULTIES.map((diff) => (
                        <option key={diff} value={diff}>{diff}</option>
                    ))}
                </select>

                <div className="textarea-wrapper">
                    <textarea
                        name="answer"
                        placeholder="Write the answer here... (min 20 characters)"
                        value={formData.answer}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.answer ? 'input-error' : ''}
                    />
                    <span className={charCountClass}>
                        {answerLength} / {RULES.answer.max}
                    </span>
                </div>
                {errors.answer && <p className="error-msg">{errors.answer}</p>}

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : editData ? 'Update Question' : 'Add Question'}
                </button>

                {editData && (
                    <button type="button" className="cancel-btn" onClick={onCancel}>
                        Cancel
                    </button>
                )}
            </form>
        </div>
    );
}

export default QuestionForm;

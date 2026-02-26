function QuestionList({ questions, onEdit, onDelete }) {
    if (questions.length === 0) {
        return <p className="no-questions">No questions found. Add one above!</p>;
    }

    return (
        <div className="question-list">
            {questions.map((q) => (
                <div key={q._id} className="question-card">
                    <div className="tags">
                        <span className="tag category">{q.category}</span>
                        <span className="tag difficulty">{q.difficulty}</span>
                    </div>
                    <h3>{q.questionText}</h3>

                    <p><strong>Answer:</strong> {q.answer}</p>

                    <div className="card-actions">
                        <button className="edit-btn" onClick={() => onEdit(q)}>Edit</button>
                        <button className="delete-btn" onClick={() => onDelete(q._id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default QuestionList;

import { useState, useEffect } from 'react';
import QuestionForm from './components/QuestionForm';
import QuestionList from './components/QuestionList';
import Filter from './components/Filter';
import { getQuestions, addQuestion, updateQuestion, deleteQuestion } from './api';
import './index.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [editData, setEditData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await getQuestions();
      setQuestions(res.data);
    } catch (err) {
      console.error('Error fetching questions:', err);
    }
  };

  const filteredQuestions = selectedCategory
    ? questions.filter((q) => q.category.toUpperCase() === selectedCategory.toUpperCase())
    : questions;
  const handleFormSubmit = async (formData) => {
    try {
      if (editData) {
        await updateQuestion(editData._id, formData);
        setEditData(null);
      } else {
        await addQuestion(formData);
      }
      fetchQuestions();
    } catch (err) {
      console.error('Error saving question:', err);
    }
  };

  const handleEdit = (question) => {
    setEditData(question);
  };
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return;
    try {
      await deleteQuestion(id);
      fetchQuestions();
    } catch (err) {
      console.error('Error deleting question:', err);
    }
  };
  const handleCancel = () => {
    setEditData(null);
  };

  return (
    <div className="app-container">
      <h1>Interview Question Vault</h1>

      <QuestionForm
        onSubmit={handleFormSubmit}
        editData={editData}
        onCancel={handleCancel}
      />

      <Filter questions={questions} selectedCategory={selectedCategory} onChange={setSelectedCategory} />

      <h2>All Questions ({filteredQuestions.length})</h2>

      <QuestionList
        questions={filteredQuestions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;

function Filter({ questions, selectedCategory, onChange }) {
    const uniqueCategories = [...new Set(
        questions.map((q) => q.category.toUpperCase())
    )].sort();

    return (
        <div className="filter-container">
            <label htmlFor="category-filter">Filter by Category:</label>
            <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">All</option>
                {uniqueCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>
        </div>
    );
}

export default Filter;

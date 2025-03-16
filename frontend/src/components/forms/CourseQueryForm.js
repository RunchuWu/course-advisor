import React, { useState } from 'react';

const CourseQueryForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    major: '',
    interests: '',
    query: ''
  });

  const { major, interests, query } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h3 className="card-title mb-4">Course Recommendation Query</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="major" className="form-label">Major</label>
            <input
              type="text"
              className="form-control"
              id="major"
              name="major"
              value={major}
              onChange={onChange}
              placeholder="e.g., Computer Science, Economics"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="interests" className="form-label">Academic Interests</label>
            <input
              type="text"
              className="form-control"
              id="interests"
              name="interests"
              value={interests}
              onChange={onChange}
              placeholder="e.g., Machine Learning, Data Science, Finance"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="query" className="form-label">Your Question</label>
            <textarea
              className="form-control"
              id="query"
              name="query"
              value={query}
              onChange={onChange}
              rows="3"
              placeholder="e.g., What courses should I take for a CS major interested in AI?"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Get Recommendations</button>
        </form>
      </div>
    </div>
  );
};

export default CourseQueryForm; 
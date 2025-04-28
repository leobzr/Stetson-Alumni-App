import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL, OPPORTUNITY_TYPES } from '../../config';

function PostOpportunityForm({ onSuccess = () => {} }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    is_paid: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user, accessToken } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Add the user's username to the posted_by field
      const opportunityData = {
        ...formData,
        posted_by: user.user_name
      };
      
      const response = await fetch(`${API_BASE_URL}/opportunities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        credentials: 'include',
        body: JSON.stringify(opportunityData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to post opportunity');
      }
      
      setSuccess('Opportunity submitted successfully and pending approval!');
      setFormData({
        title: '',
        description: '',
        type: '',
        is_paid: false
      });
      onSuccess(data);
      
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5>Post New Opportunity</h5>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="type" className="form-label">Type</label>
            <select
              className="form-select"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Select Opportunity Type</option>
              {OPPORTUNITY_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="is_paid"
              name="is_paid"
              checked={formData.is_paid}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="is_paid">Is this a paid opportunity?</label>
          </div>
          
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit Opportunity'}
            </button>
          </div>
        </form>
      </div>
      <div className="card-footer text-muted">
        All opportunities require admin approval before being published.
      </div>
    </div>
  );
}

export default PostOpportunityForm;
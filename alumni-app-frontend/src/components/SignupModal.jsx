import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../../config';

function SignupModal({ closeModal }) {
  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    year_graduated: new Date().getFullYear(),
    major: '',
    company: '',
    title: ''
  });
  
  const [majors, setMajors] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();

  // Fetch majors for dropdown
  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/majors`);
        if (response.ok) {
          const data = await response.json();
          setMajors(data);
        }
      } catch (err) {
        console.error('Error fetching majors:', err);
      }
    };

    fetchMajors();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: id === 'year_graduated' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const result = await signup(formData);
      if (result.success) {
        setSuccess(result.message);
        setTimeout(() => closeModal(), 3000);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal show" style={{ display: 'block' }} tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Sign Up</h5>
            <button type="button" className="btn-close" onClick={closeModal}></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="user_name" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="user_name"
                    value={formData.user_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="first_name" className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="last_name" className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="year_graduated" className="form-label">Year Graduated</label>
                  <input
                    type="number"
                    className="form-control"
                    id="year_graduated"
                    min="1900"
                    max={new Date().getFullYear()}
                    value={formData.year_graduated}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="major" className="form-label">Major</label>
                  <select
                    className="form-select"
                    id="major"
                    value={formData.major}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Major</option>
                    {majors.map(major => (
                      <option key={major._id} value={major.name}>{major.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="company" className="form-label">Company</label>
                  <input
                    type="text"
                    className="form-control"
                    id="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="title" className="form-label">Job Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12 mt-3">
                  <button 
                    type="submit" 
                    className="btn btn-primary w-100"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Sign Up'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupModal;

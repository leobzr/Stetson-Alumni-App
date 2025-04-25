import { useState, useEffect, useCallback } from 'react'; // Add useCallback
import { API_BASE_URL } from '../../config';
import { useAuth } from '../context/AuthContext';

function ApproveOpportunities() {
  const [pendingOpportunities, setPendingOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, accessToken } = useAuth();

  // Use useCallback to memoize the fetch function
  const fetchPendingOpportunities = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/admin/opportunities/pending`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include'
      });
      
      if (!response.ok) throw new Error('Failed to fetch pending opportunities');
      
      const data = await response.json();
      setPendingOpportunities(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [accessToken]); // Include dependencies the function relies on

  // Now include fetchPendingOpportunities in the dependency array
  useEffect(() => {
    if (user?.role !== 'admin') return;
    fetchPendingOpportunities();
  }, [user, fetchPendingOpportunities]); // Include all dependencies

  const handleApproval = async (id, approved) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/opportunities/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
        body: JSON.stringify({ opportunityId: id, approved })
      });
      
      if (!response.ok) throw new Error('Failed to update opportunity status');
      
      // Remove the opportunity from the list
      setPendingOpportunities(prev => prev.filter(opp => opp._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (user?.role !== 'admin') {
    return <div className="container mt-4">
      <div className="alert alert-danger">You don't have permission to access this page</div>
    </div>;
  }

  return (
    <div className="container mt-4">
      <h2>Approve Opportunities</h2>
      
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : pendingOpportunities.length === 0 ? (
        <div className="alert alert-info">No pending opportunities to approve</div>
      ) : (
        <div className="row">
          {pendingOpportunities.map(opportunity => (
            <div key={opportunity._id} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">{opportunity.title}</h5>
                  <span className="badge bg-warning">Pending</span>
                </div>
                <div className="card-body">
                  <h6>{opportunity.company}</h6>
                  <p>{opportunity.description}</p>
                  <p><strong>Type:</strong> {opportunity.type}</p>
                  <p><strong>Location:</strong> {opportunity.location}</p>
                  <p><strong>Posted by:</strong> {opportunity.user_name}</p>
                  <div className="d-flex justify-content-end">
                    <button 
                      className="btn btn-danger me-2" 
                      onClick={() => handleApproval(opportunity._id, false)}
                    >
                      Reject
                    </button>
                    <button 
                      className="btn btn-success" 
                      onClick={() => handleApproval(opportunity._id, true)}
                    >
                      Approve
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ApproveOpportunities;
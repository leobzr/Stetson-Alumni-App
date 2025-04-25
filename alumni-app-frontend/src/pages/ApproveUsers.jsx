import React, { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../../config';
import { useAuth } from '../context/AuthContext';

function ApproveUsers() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, accessToken } = useAuth();

  const fetchPendingUsers = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/pending`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include'
      });
      
      if (!response.ok) throw new Error('Failed to fetch pending users');
      
      const data = await response.json();
      setPendingUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    if (user?.role !== 'admin') return;
    fetchPendingUsers();
  }, [user, fetchPendingUsers]);

  const handleApproval = async (id, approved) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
        body: JSON.stringify({ userId: id, approved })
      });
      
      if (!response.ok) throw new Error('Failed to update user status');
      
      setPendingUsers(prev => prev.filter(u => u._id !== id));
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
    <div className="container-fluid mt-4" style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <h2 className="mb-4">Approve Users</h2>
      
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : pendingUsers.length === 0 ? (
        <div className="alert alert-info">No pending users to approve</div>
      ) : (
        <div className="row">
          {pendingUsers.map(user => (
            <div key={user._id} className="col-12 col-md-6 mb-4" style={{ minWidth: '300px' }}>
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">{user.first_name} {user.last_name}</h5>
                  <span className="badge bg-warning">Pending</span>
                </div>
                <div className="card-body">
                  <table className="table table-borderless">
                    <tbody>
                      <tr>
                        <td style={{width: '30%'}}><strong>Username:</strong></td>
                        <td>@{user.user_name}</td>
                      </tr>
                      <tr>
                        <td><strong>Email:</strong></td>
                        <td>{user.email}</td>
                      </tr>
                      <tr>
                        <td><strong>Major:</strong></td>
                        <td>{user.major}</td>
                      </tr>
                      <tr>
                        <td><strong>Graduated:</strong></td>
                        <td>{user.year_graduated}</td>
                      </tr>
                      <tr>
                        <td><strong>Company:</strong></td>
                        <td>{user.company || 'Not specified'}</td>
                      </tr>
                      <tr>
                        <td><strong>Job Title:</strong></td>
                        <td>{user.title || 'Not specified'}</td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <div className="d-flex justify-content-end">
                    <button 
                      className="btn btn-outline-danger me-2" 
                      onClick={() => handleApproval(user._id, false)}
                    >
                      Reject
                    </button>
                    <button 
                      className="btn btn-success" 
                      onClick={() => handleApproval(user._id, true)}
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

export default ApproveUsers;
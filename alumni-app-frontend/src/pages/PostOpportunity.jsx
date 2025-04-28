import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PostOpportunityForm from '../components/PostOpportunityForm';

function PostOpportunity() {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  // Check if user is logged in and approved
  if (!user) {
    return <Navigate to="/" />;
  }
  
  if (!user.is_approved) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">
          Your account is pending approval. You will be able to post opportunities once approved.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Post New Opportunity</h2>
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <PostOpportunityForm 
            onSuccess={() => {
              // You can add navigation or other actions here
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default PostOpportunity;
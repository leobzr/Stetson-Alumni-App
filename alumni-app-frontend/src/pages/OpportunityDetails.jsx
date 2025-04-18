import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../config'; 

function OpportunityDetails() {
  const { id } = useParams(); // Extract the ID from the URL
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/opportunities/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch opportunity details');
        }
        const data = await response.json();
        setOpportunity(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOpportunity();
    }
  }, [id]);

  if (loading) {
    return <p>Loading opportunity details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        margin: '0 auto',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          border: '2px solid #ccc',
          borderRadius: '10px',
          padding: '20px',
          maxWidth: '600px',
          width: '100%',
          backgroundColor: '#f9f9f9',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '20px',
            color: '#333',
          }}
        >
          Opportunity Details
        </h2>
        {opportunity ? (
          <div>
            <h3
              style={{
                fontSize: '24px',
                marginBottom: '10px',
                color: '#007bff',
              }}
            >
              {opportunity.title}
            </h3>
            <p
              style={{
                fontSize: '16px',
                marginBottom: '10px',
                color: '#555',
              }}
            >
              <strong>Description:</strong> {opportunity.description}
            </p>
            <p
              style={{
                fontSize: '16px',
                marginBottom: '10px',
                color: '#555',
              }}
            >
              <strong>Type:</strong> {opportunity.type}
            </p>
            <p
              style={{
                fontSize: '16px',
                marginBottom: '10px',
                color: '#555',
              }}
            >
              <strong>Posted by:</strong> {opportunity.posted_by}
            </p>
            <p
              style={{
                fontSize: '16px',
                marginBottom: '10px',
                color: '#555',
              }}
            >
              <strong>Is Paid:</strong> {opportunity.is_paid ? 'Yes' : 'No'}
            </p>
          </div>
        ) : (
          <p>No opportunity data available.</p>
        )}
      </div>
    </div>
  );
}

export default OpportunityDetails;
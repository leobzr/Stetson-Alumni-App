import React from 'react';

function ApproveOpportunities() {
  const opportunities = [
    {
      id: 1,
      title: 'Web Development Internship',
      description: 'A 3-month internship opportunity to work on web development projects.',
      date: '2025-03-01',
    },
    {
      id: 2,
      title: 'Marketing Assistant',
      description: 'Assist the marketing team in creating campaigns and managing social media.',
      date: '2025-03-05',
    },
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Approve Opportunities</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {opportunities.map((opp) => (
          <div
            key={opp.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '15px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h2 style={{ margin: '0 0 10px' }}>{opp.title}</h2>
            <p style={{ margin: '0 0 10px', color: '#555' }}>{opp.description}</p>
            <small style={{ color: '#888' }}>Posted on: {opp.date}</small>
            <div style={{ marginTop: '10px' }}>
              <button
                style={{
                  marginRight: '10px',
                  padding: '8px 12px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Approve
              </button>
              <button
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApproveOpportunities;
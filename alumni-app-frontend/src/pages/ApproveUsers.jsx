import React from 'react';

function ApproveUsers() {
  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      date: '2025-03-01',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      date: '2025-03-05',
    },
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Approve Users</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {users.map((user) => (
          <div
            key={user.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '15px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h2 style={{ margin: '0 0 10px' }}>{user.name}</h2>
            <p style={{ margin: '0 0 10px', color: '#555' }}>Email: {user.email}</p>
            <small style={{ color: '#888' }}>Requested on: {user.date}</small>
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

export default ApproveUsers;
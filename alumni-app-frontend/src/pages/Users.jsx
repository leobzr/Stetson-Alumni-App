// src/pages/Users.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { API_BASE_URL, ITEMS_PER_PAGE } from '../../config';

function Users() {
  const [users, setUsers] = useState([]); // State to store users
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  const itemsPerPage = ITEMS_PER_PAGE; // Use ITEMS_PER_PAGE constant

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetch ALL users by using a very large limit
        const response = await fetch(`${API_BASE_URL}/users?limit=100`);
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data.users || []); // Extract the users array
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Calculate the users to display on the current page
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentUsers = users.slice(indexOfFirst, indexOfLast);

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Users</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {currentUsers.map((user) => (
          <Link
            to={`/users/${user.user_name}`} // Use user_name instead of username
            key={user.user_name} // Ensure the key is unique
            style={{
              textDecoration: 'none', // Remove underline from links
              color: 'inherit', // Inherit text color
            }}
          >
            <div
              style={{
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <img
                src={'/person.png'} // Placeholder image
                alt="User Thumbnail"
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                }}
              />
              <div>
                <h3 style={{ margin: '0 0 5px 0' }}>{user.first_name} {user.last_name}</h3>
                <p style={{ margin: '0', fontSize: '0.9rem', color: '#555' }}>Email: {user.email}</p>
                <p style={{ margin: '0', fontSize: '0.9rem', color: '#555' }}>Company: {user.company}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div style={{ marginTop: '20px' }}> {/* Add spacing above the pagination */}
        <Pagination
          totalItems={users.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Users;

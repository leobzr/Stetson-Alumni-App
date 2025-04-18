// src/pages/Opportunities.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { API_BASE_URL } from '../../config'; // Ensure you have a config file for the base URL

function Opportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 3; // Limit to 3 opportunities per page

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        console.log("Fetching from:", `${API_BASE_URL}/opportunities?limit=100`);
        const response = await fetch(`${API_BASE_URL}/opportunities?limit=100`);
        if (!response.ok) {
          throw new Error('Failed to fetch opportunities');
        }
        const data = await response.json();
        console.log("Response data:", data);
        
        // Extract the opportunities array from the response
        setOpportunities(data.opportunities || []);
        
        // If using the server's pagination, update total items count
        // You might want to use this for your Pagination component
        if (data.total) {
          // If you need to store the total number of items
          // setTotalItems(data.total);
        }
      } catch (err) {
        console.error("Error details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentOpportunities = opportunities.slice(indexOfFirst, indexOfLast);

  if (loading) {
    return <p>Loading opportunities...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Opportunities</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {currentOpportunities.map((opportunity) => (
          <Link
            to={`/opportunities/${opportunity._id}`} // Use _id to link to the details page
            key={opportunity._id}
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <div
              style={{
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '15px',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                fontSize: '16px', // Adjust font size for better readability
              }}
            >
              <h3
                style={{
                  fontSize: '18px', // Reduce the font size of the title
                  margin: '0 0 5px 0', // Add some spacing below the title
                  color: '#333', // Optional: Adjust the color for better readability
                }}
              >
                {opportunity.title} | {opportunity.type}
              </h3>
              <p>Posted By: {opportunity.posted_by}</p>
            </div>
          </Link>
        ))}
      </div>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
      <Pagination
        totalItems={opportunities.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      </div>
    </div>
  );
}

export default Opportunities;

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { API_BASE_URL } from '../../config';
import { useAuth } from '../context/AuthContext'; // Import useAuth

function UserProfile() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth(); // Get current user to check if viewing own profile
  const navigate = useNavigate(); // For navigation to messages page
  
  useEffect(() => {
    // Fetch profile data from the API
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/users/${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  // Function to navigate to messages and start conversation
  const handleMessageUser = () => {
    // Store the user to message in sessionStorage
    sessionStorage.setItem('messageUser', JSON.stringify(profile));
    // Navigate to messages page
    navigate('/messages');
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Check if this is the current user's profile
  const isOwnProfile = user && user.user_name === username;

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
          border: '2px solid black',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center',
          width: '400px',
          maxWidth: '90%',
          backgroundColor: '#f9f9f9',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2>User Profile</h2>
        {profile ? (
          <div>
            <img
              src={'/person.png'}
              alt="Profile"
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                marginBottom: '10px',
              }}
            />
            <h3>{profile.first_name} {profile.last_name}</h3>
            <p>Email: {profile.email}</p>
            <p>Major: {profile.major}</p>
            <p>@{profile.company}</p>
            <p>
              <a href={profile.linkedin_link} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </p>
            
            {/* Add Message button - only show if not viewing own profile and user is logged in */}
            {!isOwnProfile && user && (
              <button 
                className="btn btn-primary mt-3"
                onClick={handleMessageUser}
              >
                <i className="bi bi-chat-dots me-1"></i> Send Message
              </button>
            )}
          </div>
        ) : (
          <p>No profile data available.</p>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
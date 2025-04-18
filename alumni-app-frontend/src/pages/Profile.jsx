import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../config'; // Ensure you have a config file for the base URL

function Profile() {
    const { userId } = useParams(); // Get userId from the URL (if any)
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        // Fetch profile data from the API
        const fetchProfile = async () => {
            try {
                const endpoint = userId
                    ? `${API_BASE_URL}/users/${userId}` // Fetch specific user profile
                    : `${API_BASE_URL}/users/leobzr`; // Fetch your profile
                const response = await fetch(endpoint);
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
    }, [userId]);

    if (loading) {
        return <p>Loading profile...</p>;
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
                height: '100%', // Use 100% height instead of minHeight: '100vh'
                width: '100%',
                margin: '0 auto',
                padding: '20px',
                boxSizing: 'border-box',
            }}
        >
            <div
                style={{
                    border: '2px solid black', // Black border
                    padding: '20px', // Padding inside the border
                    borderRadius: '10px', // Optional: Rounded corners
                    textAlign: 'center', // Center text inside the box
                    width: '400px', // Increased width for better horizontal space
                    maxWidth: '90%', // Ensure it doesn't exceed the screen width on smaller devices
                    backgroundColor: '#f9f9f9', // Light background color
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Optional: Add a shadow for better visibility
                }}
            >
                <h2>Profile</h2>
                {profile ? (
                    <div>
                        <img
                            src={'/person.png'}
                            alt="Profile"
                            style={{
                                width: '120px', // Reduced size for better vertical fit
                                height: '120px', // Match width for a circular image
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
                    </div>
                ) : (
                    <p>No profile data available.</p>
                )}
            </div>
        </div>
    );
}

export default Profile;
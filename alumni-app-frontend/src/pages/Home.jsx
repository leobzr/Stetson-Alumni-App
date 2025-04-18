// src/pages/Home.jsx
import React from 'react';
import NewsList from './NewsList';

function Home() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%', // Use 100% height instead of minHeight: '100vh'
        width: '100%',
        margin: '0',
        padding: '20px', // Add padding for spacing
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%', // Make the content responsive
          maxWidth: '600px', // Limit the maximum width
          textAlign: 'center', // Center text inside this div
          padding: '0 20px', // Add padding for smaller screens
        }}
      >
        <h1>Alumni Connections and Opportunities</h1>
        <p>Make connections, and find the best opportunity for you here!</p>
        <h3>Stetson News: </h3>
        <NewsList />
      </div>
    </div>
  );
}

export default Home;

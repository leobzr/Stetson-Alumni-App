// src/pages/NewsList.jsx
import React from 'react';

function NewsList() {
  // Example data
  const articles = [
    {
      id: 1,
      source: 'stetson.edu',
      title: 'Dr. Plante Elected Stetson University President',
      time: '3 days ago',
    },
    {
      id: 2,
      source: 'stetson.edu',
      title: 'New Dorm, Scarlato Hall, finished building.',
      time: '8 hours ago',
    },
  ];

  return (
    <div className="mt-4 justify-content-center align-items-center">
      {articles.map((article) => (
        <div key={article.id} className="card mb-3 shadow-sm">
          <div className="row g-0">
            {/* Optional image on the left */}
            {article.image && (
              <div className="col-auto">
                <img
                  src={article.image}
                  alt="news"
                  className="img-fluid rounded-start"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
              </div>
            )}
            <div className="col">
              <div className="card-body">
                <small className="text-muted">
                  {article.source} &bull; {article.time}
                </small>
                <h5 className="card-title mt-1">{article.title}</h5>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NewsList;

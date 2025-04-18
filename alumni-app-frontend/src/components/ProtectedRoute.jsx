// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ loginState, children }) {
  if (loginState === 'guest') {
    // Redirect guests back to home (or a login page)
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;

import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Users from './pages/Users'
import Opportunities from './pages/Opportunities'
import UserProfile from './pages/UserProfile'
import OpportunitiesDetails from './pages/OpportunityDetails'
import LoginModal from './components/LoginModal'
import SignupModal from './components/SignupModal'
import Footer from './components/Footer'
import ApproveOpportunities from './pages/ApproveOpportunities'
import ApproveUsers from './pages/ApproveUsers'
import Messages from './pages/Messages'
import { AuthProvider, useAuth } from './context/AuthContext'
import TokenExpirationAlert from './components/TokenExpirationAlert';
import PostOpportunity from './pages/PostOpportunity';

// Protected route component
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

// Admin route component
function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>;
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}

function AppContent() {
  const { user, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <header>
          <nav className="navbar navbar-expand-lg navbar-dark bg-success fixed-top justify-content-center">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">
                <img
                  src="/stetson.png"
                  alt="Logo"
                  style={{ width: '40px', height: '40px', marginRight: '10px' }}
                />
                Stetson University | Alumni App
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                  </li>
                  {user && (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link" to="/users">Users</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/opportunities">Opportunities</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/profile">Profile</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/messages">Messages</Link>
                      </li>
                      {user.is_approved && (
                        <li className="nav-item">
                          <Link className="nav-link" to="/post-opportunity">Post Opportunity</Link>
                        </li>
                      )}
                    </>
                  )}
                  {user?.role === 'admin' && (
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="adminDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Admin Panel
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="adminDropdown">
                        <li>
                          <Link className="dropdown-item" to="/approve-opportunities">
                            Approve Opportunities
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/approve-users">
                            Approve Users
                          </Link>
                        </li>
                      </ul>
                    </li>
                  )}
                </ul>
                <div className="navbar-nav">
                  {!user ? (
                    <>
                      <button
                        className="btn btn-outline-light me-2"
                        onClick={() => setShowLogin(true)}
                      >
                        Login
                      </button>
                      <button
                        className="btn btn-outline-light"
                        onClick={() => setShowSignup(true)}
                      >
                        Signup
                      </button>
                    </>
                  ) : (
                    <div className="dropdown">
                      <button
                        className="btn btn-outline-light dropdown-toggle"
                        type="button"
                        id="profileDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {user.first_name} {user.last_name}
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                        <li>
                          <Link className="dropdown-item" to="/profile">My Profile</Link>
                        </li>
                        <li><hr className="dropdown-divider" /></li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={logout}
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </header>

        <main className="flex-grow-1 d-flex flex-column align-items-center justify-content-start mt-5 pt-4"
          style={{ width: '100%', height: 'auto' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/users" 
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/users/:username" 
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/opportunities" 
              element={
                <ProtectedRoute>
                  <Opportunities />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/opportunities/:id" 
              element={
                <ProtectedRoute>
                  <OpportunitiesDetails />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/messages/*" 
              element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/approve-opportunities" 
              element={
                <AdminRoute>
                  <ApproveOpportunities />
                </AdminRoute>
              }
            />
            <Route 
              path="/approve-users" 
              element={
                <AdminRoute>
                  <ApproveUsers />
                </AdminRoute>
              }
            />
            <Route 
              path="/post-opportunity" 
              element={
                <ProtectedRoute>
                  <PostOpportunity />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />

        {showLogin && <LoginModal closeModal={() => setShowLogin(false)} />}
        {showSignup && <SignupModal closeModal={() => setShowSignup(false)} />}
        <TokenExpirationAlert />
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

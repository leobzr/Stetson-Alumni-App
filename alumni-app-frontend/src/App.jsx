import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Users from './pages/Users'
import Opportunities from './pages/Opportunities'
import UserProfile from './pages/UserProfile' // Import UserProfile component
import OpportunitiesDetails from './pages/OpportunityDetails';
import LoginModal from './components/LoginModal'
import SignupModal from './components/SignupModal'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import ApproveOpportunities from './pages/ApproveOpportunities';
import ApproveUsers from './pages/ApproveUsers';

function App() {
  const [loginState, setLoginState] = useState('guest')
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)

  return (
    <Router>
      {/* d-flex flex-column + min-vh-100 for sticky footer layout */}
      <div className="d-flex flex-column min-vh-100">
        <header>
          {/* Changed navbar-light to navbar-dark and updated button class */}
          <nav className="navbar navbar-expand-lg navbar-dark bg-success fixed-top justify-content-center">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">
                {/* Replace with your logo URL */}
                <img
                  src="/stetson.png" // Replace with actual logo URL
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
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                  </li>
                  {loginState !== 'guest' && (
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
                    </>
                  )}
                  {loginState === 'admin' && (
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#admin"
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
                <div className="navbar-nav ms-auto">
                  {loginState === 'guest' && (
                    <>
                      <button
                        className="btn btn-outline-light me-2"
                        onClick={() => setShowLogin(true)}
                      >
                        Login
                      </button>
                      <button
                        className="btn btn-outline-light me-2"
                        onClick={() => setShowSignup(true)}
                      >
                        Signup
                      </button>
                    </>
                  )}
                  {/* Dropdown for Login State */}
                  <div className="nav-item dropdown">
                    <button
                      className="btn btn-dark dropdown-toggle"
                      type="button"
                      id="loginStateDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Current State: {loginState}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="loginStateDropdown">
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => setLoginState('guest')}
                        >
                          Guest
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => setLoginState('user')}
                        >
                          User
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => setLoginState('admin')}
                        >
                          Admin
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>

        {/* main with top margin/padding so content isn't hidden under fixed-top nav */}
        <main className="flex-grow-1 d-flex flex-column align-items-center justify-content-start mt-5 pt-4"
          style={{ width: '100%', height: 'auto' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/users"
              element={
                <ProtectedRoute loginState={loginState}>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users/:username" // Dynamic route for user profiles
              element={
                <ProtectedRoute loginState={loginState}>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile" // Route for the main profile page
              element={
                <ProtectedRoute loginState={loginState}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/opportunities"
              element={
                <ProtectedRoute loginState={loginState}>
                  <Opportunities />
                </ProtectedRoute>
              }
            />
            <Route
              path="/opportunities/:id"
              element={
                <ProtectedRoute loginState={loginState}>
                  <OpportunitiesDetails />
                </ProtectedRoute>
              } />
            <Route
              path="/approve-opportunities"
              element={
                <ProtectedRoute loginState={loginState}>
                  <ApproveOpportunities />
                </ProtectedRoute>
              }
            />
            <Route
              path="/approve-users"
              element={
                <ProtectedRoute loginState={loginState}>
                  <ApproveUsers />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        {/* Footer at the bottom of the flex container */}
        <Footer loginState={loginState} setLoginState={setLoginState} />

        {showLogin && <LoginModal closeModal={() => setShowLogin(false)} />}
        {showSignup && <SignupModal closeModal={() => setShowSignup(false)} />}
      </div>
    </Router>
  )
}

export default App

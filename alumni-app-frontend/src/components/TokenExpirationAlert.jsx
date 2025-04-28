import { useAuth } from '../context/AuthContext';

function TokenExpirationAlert() {
  const { showExpirationAlert, refreshToken, dismissExpirationAlert } = useAuth();

  if (!showExpirationAlert) {
    return null;
  }

  return (
    <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
      <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-header bg-warning">
          <strong className="me-auto">Session Expiring</strong>
          <button
            type="button"
            className="btn-close"
            onClick={dismissExpirationAlert}
          ></button>
        </div>
        <div className="toast-body">
          <p>Your session is about to expire. Would you like to stay logged in?</p>
          <div className="mt-2 pt-2 border-top">
            <button
              type="button"
              className="btn btn-primary btn-sm me-2"
              onClick={refreshToken}
            >
              Stay Logged In
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={dismissExpirationAlert}
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TokenExpirationAlert;
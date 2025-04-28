// Helper functions for working with JWTs

// Parse JWT without libraries
export const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error parsing JWT:", error);
    return null;
  }
};

// Get time remaining in seconds
export const getTokenTimeRemaining = (token) => {
  if (!token) return 0;
  
  const parsed = parseJwt(token);
  if (!parsed || !parsed.exp) return 0;
  
  const now = Math.floor(Date.now() / 1000);
  return Math.max(0, parsed.exp - now);
};

// Check if token is about to expire (within threshold seconds)
export const isTokenExpiringSoon = (token, thresholdSeconds = 300) => {
  const timeRemaining = getTokenTimeRemaining(token);
  return timeRemaining > 0 && timeRemaining < thresholdSeconds;
};
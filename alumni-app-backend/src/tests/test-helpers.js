// Helper file to provide test-specific middleware

export const bypassAuthMiddleware = (req, res, next) => {
  // Set user as admin for all requests in tests
  req.user = { id: 'test-admin-id', role: 'admin' };
  next();
};
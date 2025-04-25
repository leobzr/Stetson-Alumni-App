/**
 * Configuration settings for the Alumni App
 */

// API base URL - update this value when deploying to different environments
export const API_BASE_URL = 'http://localhost:5000/api'; // Local development URL

// Other configuration settings
export const ITEMS_PER_PAGE = 5; // Number of items to display per page
export const DEFAULT_AVATAR = '/person.png'; // Default avatar image path

// Possible opportunity types
export const OPPORTUNITY_TYPES = [
  'Internship',
  'Job',
  'Volunteer',
  'Co-op',
  'Other'
];
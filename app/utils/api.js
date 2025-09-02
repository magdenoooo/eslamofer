// API configuration utility
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.eslamoffers.com/api',
  UPLOADS_URL: process.env.NEXT_PUBLIC_UPLOADS_BASE_URL || 'https://api.eslamoffers.com/uploads/',
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  const baseUrl = API_CONFIG.BASE_URL.endsWith('/') 
    ? API_CONFIG.BASE_URL.slice(0, -1) 
    : API_CONFIG.BASE_URL;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
};

// Helper function to get full uploads URL
export const getUploadsUrl = (filename) => {
  if (!filename) return null;
  if (filename.startsWith('http://') || filename.startsWith('https://')) {
    return filename;
  }
  const baseUrl = API_CONFIG.UPLOADS_URL.endsWith('/') 
    ? API_CONFIG.UPLOADS_URL 
    : `${API_CONFIG.UPLOADS_URL}/`;
  const cleanFilename = filename.startsWith('/') ? filename.slice(1) : filename;
  return `${baseUrl}${cleanFilename}`;
};
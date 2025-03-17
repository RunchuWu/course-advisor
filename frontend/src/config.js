const config = {
  apiUrl: process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-url.vercel.app/api' 
    : 'http://localhost:5000/api'
};

export default config; 
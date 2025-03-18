const config = {
  apiUrl: process.env.NODE_ENV === 'production' 
    ? 'https://vercel.com/rachels-projects-937de8c2/course-advisor-backend' 
    : 'http://localhost:5000/api'
};

export default config; 
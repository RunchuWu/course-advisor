import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3">
      <div className="container text-center">
        <p className="mb-0">© {new Date().getFullYear()} Duke Course Advisor. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 
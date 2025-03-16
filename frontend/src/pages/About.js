import React from 'react';

const About = () => {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="card shadow-sm">
          <div className="card-body">
            <h1 className="card-title mb-4">About Duke Course Advisor</h1>
            <p>
              Duke Course Advisor is an AI-powered tool designed to help Duke University students
              select courses that align with their academic interests and career goals.
            </p>
            <p>
              Our system uses advanced AI technology to analyze your major, interests, and specific
              questions to provide personalized course recommendations.
            </p>
            <h3 className="mt-4">How It Works</h3>
            <ol>
              <li>Enter your major and academic interests</li>
              <li>Ask a specific question about course selection</li>
              <li>Receive AI-generated recommendations tailored to your needs</li>
            </ol>
            <h3 className="mt-4">Contact</h3>
            <p>
              If you have any questions or feedback about Duke Course Advisor, please contact us at{' '}
              <a href="mailto:support@dukecoursesadvisor.edu">support@dukecoursesadvisor.edu</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 
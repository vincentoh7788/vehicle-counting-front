import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer mt-auto py-2 bg-light">
      <div className="container">
        <span className="text-muted">Copyright &copy;{new Date().getFullYear()} FYP from Oh Shi Chew, FTSM, Universiti Kebangsaan Malaysia.</span>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-purple-700 text-white px-4 py-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        <p className="text-sm text-center sm:text-left">
          © {new Date().getFullYear()} Drowsiness Detection System. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <a href="https://policies.google.com/privacy?hl=en-US" className="text-sm hover:underline">
            Privacy Policy
          </a>
          <a href="https://policies.google.com/terms?hl=en-US" className="text-sm hover:underline">
            Terms
          </a>
          <a href="#" className="text-sm hover:underline">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

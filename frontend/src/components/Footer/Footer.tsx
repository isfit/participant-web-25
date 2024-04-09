import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <p>© {year} Your Company Name. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

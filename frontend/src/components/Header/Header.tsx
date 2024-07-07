import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  linkTo?: string;
}

const Header: React.FC<HeaderProps> = ({ linkTo = '/' }) => {
  const logo = <img src='/isfit_log.png' alt="Logo" style={{ width: '150px' }} />;

  return (
    <header>
      <Link to={linkTo}>{logo}</Link>
    </header>
  );
};

export default Header;
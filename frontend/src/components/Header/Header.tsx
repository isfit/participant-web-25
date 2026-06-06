import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";

interface HeaderProps {
  linkTo?: string;
}

const Header: React.FC<HeaderProps> = ({ linkTo = '/' }) => {
  const logo = (
    <img
      src='/images/isfit27_logo_long.png'
      alt="Logo"
      className="headerLogo"
    />
  );

  return (
    <header>
      <Link to={linkTo}>{logo}</Link>
    </header>
  );
};

export default Header;
import React, { useState, useEffect, useRef } from 'react';
import { Button, } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import { useAuth } from '../../context/AuthenticationContext';
import { ROLES } from '../../config/roles';
import cross from '../../../public/cross.svg';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('authTokens');
    window.location.reload();
  };

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className={styles.homePage}>
      <div className={styles.hamburgerMenu} onClick={!menuOpen ? toggleMenu : undefined}>
        {!menuOpen ? (
          <>
          <div className={styles.hamburgerIconContainer}>
            <div className={styles.hamburgerIcon}></div>
            <div className={styles.hamburgerIcon}></div>
            <div className={styles.hamburgerIcon}></div>
          </div>
          </>
        ) : (
          <div className={styles.hamburgerIconClose}>
            <img src={cross} className={styles.hamburgerCross} alt="Close menu" />
          </div>
        )}
      </div>

      <div
        ref={menuRef}
        className={`${styles.sideMenu} ${menuOpen ? styles.open : ''}`}
      >
        <Link to="/faq">FAQ</Link>
        <Link to="/homePage">Homepage</Link>
        {user?.role === ROLES.ADMIN && (
          <Link to="/admin">Admin</Link>
        )}
        {!user && <Link to="/login">Login</Link>}
        {user && <Button onClick={handleLogout}>Logout</Button>}
      </div>
      <div className={styles.centerContainer}>
        <img src={'images/isfit_log.png'} alt="Logo" className={styles.logo} />
        <br />
        <Link to="/applicationForm">
          <Button className={styles.applyButton}>Apply now!</Button>
        </Link>
        <div className={styles.container}>
          <h1 className={styles.homePageHeader}>
            Welcome to the ISFiT 2027 Participant Web!
          </h1>
<p>
            ISFiT, the world's largest international student festival, is held
            biennially in Trondheim, Norway, during the spring semester. Since
            its inception in 1990, ISFiT has brought together students from
            diverse national and cultural backgrounds, fostering dialogue and
            connection through stimulating discussions on important global
            issues.
          </p>
          <p>
            Each festival centers around a unique theme, and for 2027, we will
            be exploring the theme of CHANGING WINDS. In a world of mass
            political upheaval, climate change, and a shifting global order, old
            truths are no longer certain. We invite you to join us in Trondheim
            for this exciting event, where students from across the globe will
            gather to engage, learn, and inspire one another as we discuss the
            state of our world and this fragile present.
          </p>
          {/* <p>
            If you are having trouble applying through this website, you can
            alternatively apply through this <a href="https://forms.gle/DFatZ3yqWkdDsuYt6" className={styles.footerEmailLink} target='_blank'>Google Form</a>!
          </p> */}
        </div>
      </div>

      

      {/* Footer Section */}
      <footer className={styles.footer}>
      <img
      src='/images/isfit_log.png'
      alt="Logo"
      className={styles.footerLogo}
    />
      <div className={styles.footerLine1}>
        <div className={styles.footerLeft}>
          <a href="https://www.isfit.org" className={styles.footerLink} target="_blank" rel="noopener noreferrer">
            Homepage - isfit.org
          </a>
          <a href="https://www.studentpeaceprize.org/" className={styles.footerLink} target="_blank" rel="noopener noreferrer">
            SPP homepage - studentpeaceprize.org
          </a>
          <div className={styles.footerEmail}>
            <span>Find any bugs? Send it to </span>
            <a href="mailto:or.it.leaderteam@isfit.no" className={styles.footerEmailLink}>
              or.it.leaderteam@isfit.no
            </a>!
          </div>
        </div>
        <div className={styles.footerRight}>
          <a href="https://www.facebook.com/ISFiT" className={styles.footerLink} target="_blank" rel="noopener noreferrer">
            <img src={'/images/facebook.png'} alt="Facebook" className={styles.socialIcon} /> Facebook
          </a>
          <a href="https://www.instagram.com/isfitfestival" className={styles.footerLink} target="_blank" rel="noopener noreferrer">
            <img src={'/images/instagram.png'} alt="Instagram" className={styles.socialIcon} /> Instagram
          </a>
          <a href="https://twitter.com/ISFiT" className={styles.footerLink} target="_blank" rel="noopener noreferrer">
            <img src={'/images/x-logo.jpg'} alt="Twitter" className={styles.socialIcon} /> X
          </a>
        </div>
      </div>
      <div className={styles.footerLine2}>
        <h2><b>PARTNERS:</b></h2>
      </div>
      <div className={styles.footerLine3}>
        <img src={'/images/ntnu.png'} alt="NTNU" className={styles.partnersIcon} />
        <img src={'/images/sit.png'} alt="sit" className={styles.partnersIcon} />
        <img src={'/images/kjeldsberg.png'} alt="kjelsberg" className={styles.partnersIcon} />
      </div>
      <div className={styles.footerLine4}>
        <img src={'/images/moller.png'} alt="Moller" className={styles.partnersIcon} />
        <img src={'/images/trøndelagkommune.png'} alt="Trøndelagkommune" className={styles.partnersIcon} />
        <img src={'/images/kommune.png'} alt="Trondheim Kommune" className={styles.partnersIcon} />
      </div>
      <div className={styles.footerLine5}>
      <img src={'/images/Kilroy.png'} alt="Kilroy" className={styles.partnersIcon} />
        <img src={'/images/vaernes.png'} alt="Vaernes" className={styles.partnersIcon} />
        
      </div>
      <div className={styles.footerLine6}>
        <p>© 2027 ISFiT | All Rights Reserved</p>
      </div>
    </footer>
    </div>
    );

};

export default HomePage;

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import styles from './FAQ.module.css';
import { useAuth } from '../../context/AuthenticationContext';
import { ROLES } from '../../config/roles';
import cross from '../../../public/cross.svg';
import Header from '../../components/Header/Header';


const FAQ: React.FC = () => {
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

      <div ref={menuRef} className={`${styles.sideMenu} ${menuOpen ? styles.open : ''}`}>
      <Link to="/faq">FAQ</Link>
      <Link to="/homePage">Homepage</Link>
        {user?.role === ROLES.ADMIN && (
          <Link to="/admin">Admin</Link>
        )}
        {!user && <Link to="/login">Login</Link>}
        {user && <Button onClick={handleLogout}>Logout</Button>}
      </div>

      <Header linkTo="/homepage" />


      <div className={styles.centerContainer}>
        <div className={styles.container}>
          <h1 className={styles.homePageHeader}>Frequently Asked Questions</h1>

          {/* FAQ Section */}
          <div className={styles.faqSection}>

            <h3>Q: What are the requirements for being counted as a student?</h3>
            <p>A: To be counted as a student, you must be enrolled in a university program in 2026 and/or 2027. If you received your degree in January 2026, you are still eligible to apply. The program must be at a university level or an equivalent.</p>
            <br /><br />
            <h3>Q: My institute does not provide student certificates at this time/I am struggling with retrieving a student certificate, what can I send in?</h3>
            <p>A: Student certificates can be any of the following: A letter of admission stating the programme/course duration, student identity card, letter from university, and any school credential. All this must contain the student's full names and relevant information that confirms the applicant's status as a student. This should be uploaded as required during application for ISFiT.</p>
            <br /><br />
            <h3>Q: Should I select SOrCE or to apply as a regular participant?</h3>
            <p>A: SOrCE is a network of international student festivals that ISFiT is a part of. If you are not one of the preselected participants from one of these festivals, you should apply as a regular participant.</p>
            <br /><br />
            <h3>Q: Is it expensive to participate in ISFiT?</h3>
            <p>A: You will need to pay for your own travel fare, but once you're at the festival food and accommodation is covered. Any additional expenses will be out of your own pocket.</p>
            <br /><br />
            <h3>Q: How much financial support can I apply for, and what are the requirements?</h3>
            <p>A: We do not have the funds to support everyone, so only apply for financial support if you need it in order to be able to participate in the festival. We have volunteers dedicated to allocating funds to the participants who require them, so apply to however much you require to be able to participate.</p>
            <br /><br />
            <h3>Q: Can I get financial support, and how do I apply for it?</h3>
            <p>A: Yes, we offer limited financial support to help participants who might not otherwise be able to afford the trip to Trondheim. However, funding is not available for everyone, so we ask that you carefully assess your need before applying. You can request financial support when filling out your application—no documentation is required at that stage. If you are selected, we will contact you for more details.</p>
            <br /><br />
            <h3>Q: Central America is not in the drop down folder, what do I select?</h3>
            <p>A: Central America is not its own continent, and is a part of North America geographically. This is only to map out a geographic diversity amongst our participants.</p>
            <br /><br />
            <h3>Q: How should I fill out the application?</h3>
            <p>A: We are selecting participants based on your engagement, personal thoughts and ideas. Please answer truthfully based on your thoughts and ideas.</p>
            <br /><br />
            <h3>Q: Will you accept letters of recommendation and other documents for the reviewing process?</h3>
            <p>A: You do not need to submit other documents than the ones stated in the form, we will be basing our evaluation on your application alone.</p>
            <br /><br />
            <h3>Q: Can I use AI to write my application?</h3>
            <p>A: No. Any application we suspect AI to be of use in writing will be discounted in the reviewing process.</p>
            <br /><br />
            <h3>Q: Can I apply even if I graduate before the festival?</h3>
            <p>A: Yes, recent graduates are welcome to apply. We understand that academic schedules vary across regions, so students graduating in 2026 are still eligible to attend ISFiT 2027.</p>
            <br /><br />
            <h3>Q: Is there anything I can do to increase my chances of being selected?</h3>
            <p>A: To increase your chances, focus on answering the application questions thoroughly and thoughtfully. We're looking for participants who are genuinely interested in attending ISFiT and engaging in meaningful discussions on the theme of "Changing Winds." Show us that you can reflect on the theme and share unique experiences and perspectives from your background.</p>
            <br /><br />
            {/* <h3>Q: When will you know if you've been selected as a participant?</h3>
            <p>A: Invitation letters will be sent out around November 17th. Selected participants will have until November 26th to accept the invitation. If a participant can no longer attend, their spot will be offered to someone on the waiting list, who will be notified via email. Rejection letters will be sent after November 26th.</p>
            <br /><br /> */}
            {/* <h3>Q: I already filled out the Google Form to apply, do I need to apply on this website as well?</h3>
            <p>A: If you have already filled out the Google Form, you don't have to apply here.</p>
            <br /><br />
            <h3>Q: I see there's also a Google Form I can use to apply, do I have to fill out that and apply on this website?</h3>
            <p>A: No, you don't have to do both. One of them, either Google Form or applying through the website, is enough.</p> */}
            {/* <br /><br /> */}
            <h3>ISFiT is happening during Ramadan. I am a Muslim and planning to fast, can I still attend ISFiT?</h3>
            <p>Yes, you can still attend ISFiT if you are a Muslim planning on fasting during the festival. We will do our best to accommodate you when it comes to meals or any other needs you might have.</p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className={styles.footer}>
        <img src='/images/isfit_log.png' alt="Logo" className={styles.footerLogo} />
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
              </a>
              !
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

export default FAQ;

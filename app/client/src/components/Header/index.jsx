import React, { useEffect, useState } from 'react';
//-------------------------------------------------------------------------//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJs } from '@fortawesome/free-brands-svg-icons';
//-------------------------------------------------------------------------//
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
//-------------------------------------------------------------------------//
const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  const [installable, setInstallable] = useState(false);
  window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    setInstallable(true);
  });
  window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
  });
  const handleInstallClick = (event) => {
    const promptEvent = window.deferredPrompt;
    if(!promptEvent) {
        return;
    }
    promptEvent.prompt();
    window.deferredPrompt = null;
  };
  return (
    <div id="header">
      <section id="header-main">
        {Auth.loggedIn() ? ( 
          <>
            <span id='greeting'>Hi {Auth.getProfile().data.username}!</span>
            <div id='headerBtnDiv'>
              <Link id="Link" className="topBtn" onClick={handleInstallClick}>Install</Link>
              <Link id="Link" className="topBtn" onClick={logout}>Logout</Link>
            </div>
          </>
        ) : (
          <>
            <div id='headerBtnDiv'>
              <Link id="Link" className="topBtn" onClick={handleInstallClick}>Install</Link>
              <Link id="Link" className="topBtn" to="/">Home</Link>
              <Link id="Link" className="topBtn" to="/login">Login</Link>
              <Link id="Link" className="topBtn" to="/signup">Signup</Link>
            </div>
          </>
        )}
        <p><FontAwesomeIcon icon={faJs} style={{color: "#012137", }} /> FullStack<br />Wizard<br /><span>Repo</span></p>
      </section>
    </div>
  );
}
export default Header;

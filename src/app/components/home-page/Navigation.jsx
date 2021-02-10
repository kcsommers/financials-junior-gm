import React from 'react';
import exitBtn from '@images/exit-btn.svg';
import settingsBtn from '@images/settings-btn.svg';
import '@css/components/home-page/Navigation.css';

export const Navigation = ({ tutorialActive }) => {
  return (
    <div
      className='nav-container'
      style={{
        position: 'relative',
        zIndex: tutorialActive ? 0 : 1,
      }}
    >
      <div className='exit-stick-box'>
        <img src={exitBtn} alt='Exit' />
      </div>

      <div className='home-title-box'>
        <h1 className='page-title'>HOME</h1>
      </div>

      <div className='settings-link-box'>
        <img src={settingsBtn} alt='Settings' />
      </div>
    </div>
  );
};

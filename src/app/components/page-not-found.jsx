import React from 'react';
import { Link } from 'react-router-dom';

class PageNotFound extends React.Component {
  render() {
    return (
      <div
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          position: 'relative',
          zIndex: '100',
        }}
      >
        <div className='home-title-box'>
          <h1 className='page-title'>404 - Page Not Found!!</h1>
        </div>
        <div className='home-title-box page-title'>
          <Link
            to='/home'
            style={{
              color: '#00788a',
              textShadow:
                '0 0 5px #f3901d, 0 0 5px #f3901d, 0 0 5px #f3901d, 0 0 5px #f3901d',
              fontSize: '3rem',
            }}
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }
}

export default PageNotFound;

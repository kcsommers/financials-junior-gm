import React from 'react';
import './App.css';
import Signup from './components/pages/Signup'

const App = () => {
  return (
  <div id="app-wrapper">
    <div className='app-container'>
      <h1>Welcome to FINancials Junior GM!</h1>
      <Signup/>
    </div>
  </div>  
  );
};

export default App;

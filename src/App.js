import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePageTutorial from './app/tutorial/HomePageTutorial';
import './App.css';
import Signup from './components/pages/Signup'

const App = () => {
  return (
  <div id="app-wrapper">
    <div className='app-container'>
      <h1>Welcome to FINancials Junior GM!</h1>
        <Route exact path='/' component={HomePageTutorial} />
      {/* <Signup/> */}
    </div>
  </div>  
  );
};

export default App;

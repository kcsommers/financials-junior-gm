import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Signup from './components/pages/Signup';
import IntroTutorial from './app/tutorial/intro/IntroTutorial';

const App = () => {
  return (
    <div id='app-wrapper'>
      <div className='app-container'>
        <Router>
          <Route exact path='/' component={IntroTutorial} />
          <Route exact path='/signup' component={Signup} />
        </Router>
      </div>
    </div>
  );
};

export default App;

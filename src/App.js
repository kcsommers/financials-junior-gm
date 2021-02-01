import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Signup from './components/pages/Signup';
import Tutorial from './app/tutorial/Tutorial';

const App = () => {
  return (
    <div id='app-wrapper'>
      <div className='app-container'>
        <Router>
          <Route exact path='/' component={Tutorial} />
          <Route exact path='/signup' component={Signup} />
        </Router>
      </div>
    </div>
  );
};

export default App;

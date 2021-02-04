import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Intro from './app/pages/Intro';
import HomePage from './app/pages/home/HomePage';
import TeamPage from './app/pages/team/TeamPage';

const App = () => {
  return (
    <Router>
      <div className='app-container'>
        <Switch>
          <Route exact path='/' component={Intro} />
          <Route exact path='/home' component={HomePage} />
          <Route exact path='/team' component={TeamPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;

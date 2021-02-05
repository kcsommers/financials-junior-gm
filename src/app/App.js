import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Intro from './pages/Intro';
import HomePage from './pages/home/HomePage';
import TeamPage from './pages/team/TeamPage';
import '@css/App.css';

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

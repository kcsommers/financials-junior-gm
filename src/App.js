import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Intro from './app/pages/Intro';
import Home from './app/pages/home/Home';
import Team from './app/components/home-page/Team';

const App = () => {
  return (
    <Router>
      <div className='app-container'>
        <Switch>
          <Route exact path='/' component={Intro} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/team' component={Team} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;

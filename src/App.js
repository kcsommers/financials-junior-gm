import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Intro from './components/Intro';

const App = () => {
  return (
    <Router>
      <div className='app-container'>
        <Switch>
          <Route exact path='/' component={Intro} />
          <Route exact path='/home' component={Home} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;

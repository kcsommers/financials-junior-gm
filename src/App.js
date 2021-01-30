import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePageTutorial from './app/tutorial/HomePageTutorial';
import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={HomePageTutorial} />
      </Switch>
    </Router>
  );
};

export default App;

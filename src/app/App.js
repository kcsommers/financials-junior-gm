import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Intro from './pages/Intro';
import HomePage from './pages/HomePage';
import TeamPage from './pages/TeamPage';
import Scout from './pages/Scout';
import Season from './pages/Season';
import Scout from './pages/ScoutPage';
import '@css/App.css';
import { Overlay } from '@components';

const App = () => {
  return (
    <div className='app-container'>
      <Router>
        <Switch>
          <Route exact path='/' component={Intro} />
          <Route exact path='/home' component={HomePage} />
          <Route exact path='/team' component={TeamPage} />
          <Route exact path='/scout' component={Scout} />
          <Route exact path='/season' component={Season} />
        </Switch>
      </Router>
      <Overlay />
    </div>
  );
};

export default App;

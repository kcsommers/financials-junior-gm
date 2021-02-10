import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Intro from './pages/Intro';
import HomePage from './pages/HomePage';
import TeamPage from './pages/TeamPage';
import Season from './pages/Season';
import ScoutPage from './pages/ScoutPage';
import '@css/App.css';
import { Overlay, IceBackground } from '@components';
import BudgetPage from './pages/BudgetPage';
import Sign from './components/Sign';

const App = () => {
  return (
    <div className='app-container'>
      <Router>
        <Switch>
          <Route exact path='/' component={Intro} />
          <Route exact path='/home' component={HomePage} />
          <Route exact path='/team' component={TeamPage} />
          <Route exact path='/scout' component={ScoutPage} />
          <Route exact path='/sign' component={Sign} />
          <Route exact path='/budget' component={BudgetPage} />
          <Route exact path='/season' component={Season} />
        </Switch>
        <IceBackground />
        <Overlay />
      </Router>
    </div>
  );
};

export default App;

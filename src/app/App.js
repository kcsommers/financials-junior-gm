import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Intro from './pages/Intro';
import HomePage from './pages/HomePage';
import TeamPage from './pages/TeamPage';
import Sign from './pages/Sign';
import Scout from './pages/Scout';
import '@css/App.css';

const App = () => {
  return (
    <div className='app-container'>
      <Router>
        <Switch>
          <Route exact path='/' component={Intro} />
          <Route exact path='/home' component={HomePage} />
          <Route exact path='/team' component={TeamPage} />
          <Route exact path='/sign' component={Sign} />
          <Route exact path='/scout' component={Scout} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;

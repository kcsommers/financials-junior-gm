import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from './components/HomeComponents/Home';
import TeamPage from './components/TeamComponents/TeamPage';
import Intro from './components/Intro';

const App = () => {
  return (
    <Router>
      <div className='app-container'>
        <Switch>
          <Route exact path="/" component={Intro}/>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/team" component={TeamPage}/>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

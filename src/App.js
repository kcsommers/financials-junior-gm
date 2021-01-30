import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from './components/Home';
import Intro from './components/Intro';

const App = () => {
  return (
    <Router>
      <div className='app-container'>
        <Switch>
          <Route exact path="/" component={Intro}/>
          <Route exact path="/home" component={Home}/>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

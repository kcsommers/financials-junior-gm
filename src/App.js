import React from 'react';
import './App.css';
<<<<<<< HEAD
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
=======
import Signup from './components/pages/Signup'

const App = () => {
  return (
  <div id="app-wrapper">
    <div className='app-container'>
      <h1>Welcome to FINancials Junior GM!</h1>
      <Signup/>
    </div>
  </div>  
>>>>>>> main
  );
};

export default App;

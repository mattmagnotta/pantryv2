import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import Home from './pages'
import Login  from './components/Login'
import Signup  from './components/Signup'
import Navbar  from './components/Navbar'
import Recipes  from './components/Recipes'
import MyIngredients  from './components/MyIngredients'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

require('dotenv').config()

class App extends Component {
  render (){
    return (
      <Router>
          <Navbar/>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/ingredients" component={MyIngredients} />
          <Route path="/recipes" component={Recipes} />
          <Route exact path="/" component={Home} />
      </Router>
    );
  }

}

export default App;

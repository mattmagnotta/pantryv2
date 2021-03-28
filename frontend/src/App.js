import React, {Component,useEffect,useContext,useState} from 'react';
import axios from 'axios';
import './App.css';
import Home from './pages'
import Login  from './components/Login'
import Signup  from './components/Signup'
import Navbar  from './components/Navbar'
import Recipes  from './components/Recipes'
import MakeRecipes  from './components/MakeRecipes'
import MyIngredients  from './components/MyIngredients'
import {UserProvider,UserContext, UserDispatchContext} from './Context'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

require('dotenv').config()

function App(){
  const userDetails = React.useContext(UserContext);
  const setUserDetails = useContext(UserDispatchContext);
  useEffect(() => {
    axios.get('/get_user/').then((res) => {
      if(res.data[0].username !== undefined)
        setUserDetails({isLoggedIn:true})
    })
  },[]);

    return (
      <Router>
          <Navbar/>
          {userDetails.username}
          <Route path="/login" component={Login} />
          <Route path="/register_user" component={Signup} />
          <Route path="/ingredients" component={MyIngredients} />
          <Route path="/recipes" component={Recipes} />
          <Route path="/make_recipes" component={MakeRecipes} />
          <Route exact path="/" component={Home} />
      </Router>
    );
  }

export default App;

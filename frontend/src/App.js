import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import Home from './pages'
import Login  from './components/Login'
import Signup  from './components/Signup'
import Navbar  from './components/Navbar'
import Recipes  from './components/Recipes'
import MyIngredients  from './components/MyIngredients'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

require('dotenv').config()

class App extends Component {
  constructor(props) {
   super(props);
   this.state = {
       user:'',
       data:'',
    }
   this.updateState = this.updateState.bind(this)
 }
 componentDidMount(){
   axios.get('/logout_user/').then((res) => {
     this.setState({
       user:res.data
     })
     console.log(this.state.user)
   })
 }
   updateState(childData){
     this.setState({data:childData})
     console.log(this.state.data)
   }




  render (){
    return (
      <Router>
          <Navbar/>
          <Route path="/login" component={Login} />
          <Route path="/register_user" component={Signup} />
          <Route path="/ingredients" component={MyIngredients} />
          <Route path="/recipes" render={(props) => (
              <Recipes {...props} cbFxn={this.updateState} />)}/>
          <Route exact path="/" component={Home} />
      </Router>
    );
  }

}

export default App;

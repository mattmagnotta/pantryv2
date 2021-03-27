import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {LoginContainer} from "./LoginElements"
import axios from 'axios';
import { Redirect } from "react-router-dom";

export default function Login() {
  function getCookie(name) {
      var cookieValue = null;
      if (document.cookie && document.cookie !== '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
              var cookie = cookies[i].trim();
              if (cookie.substring(0, name.length + 1) === (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
      }
      return cookieValue;
  }
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState(false)
  const [invalidLogin, setinvalidLogin] = useState(false)


  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault()
    var csrftoken = getCookie('csrftoken');
    console.log(username)
    const json = JSON.stringify({username:username, password:password});
    const res = await axios.post('login_user/', json, {
      headers: {
    // Overwrite Axios's automatically set Content-Type
      'Content-Type': 'application/json',
      'X-CSRFTOKEN' :csrftoken
    }
  }).then(res => {
    if (res.data === 'logged in') {
      console.log('loggedin')
      setisLoggedIn(true)
      }
    else if(res.data === 'invalid login'){
      setinvalidLogin(true)
      console.log('invalid')
    }
    })
  }
  if (isLoggedIn === true){
    return <Redirect to='/'/>
  }
  else{
    return (
      <>
      <LoginContainer className="Login">
        <h1>Login</h1>
        <Form style={{width:"500px"}}onSubmit={handleSubmit}>
          {invalidLogin === true && <p>Invalid login...</p>}
        <Form.Group size="lg" controlId="username">
          <Form.Label style={{color:'white'}}>Username</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label style={{color:'white'}}>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button className='custom-btn' block size="lg" type="submit" disabled={!validateForm()}>
            Login
          </Button>
        </Form>
      </LoginContainer>

      </>

    );
  }
}

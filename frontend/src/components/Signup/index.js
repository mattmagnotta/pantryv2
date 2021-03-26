import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { Redirect } from "react-router-dom";
export default  function Signup() {
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedUp, setisSignedUp] = useState(false)
  const [usernameTaken, setusernameTaken] = useState(false)
  const [emailTaken, setemailTaken] = useState(false)


  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {

    var csrftoken = getCookie('csrftoken');
    event.preventDefault();
    const json = JSON.stringify({username:username, email:email, password:password});
    const res = await axios.post('register_user/', json, {
      headers: {
    // Overwrite Axios's automatically set Content-Type
      'Content-Type': 'application/json',
      'X-CSRFTOKEN' :csrftoken
    }
  }).then(res => {
      console.log(res)
      if (res.data === 'username taken') {
        setusernameTaken(true)
        console.log('taken')
        }
      else if(res.data === 'email taken'){
        setemailTaken(true)
          console.log('etaken')
      }
      else if(res.data === 'signed up'){
        setisSignedUp(true)
          console.log('loggedtaken')
      }
    })
  }

  if (isSignedUp === true){
    return <Redirect to='/'/>
  }
  else{
    return (
      <div className="Login">
        <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="username">
          {usernameTaken === true && <p>Username taken..</p>}
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
          <Form.Group size="lg" controlId="email">
            {emailTaken === true && <p>Email taken...</p>}
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Login
          </Button>
        </Form>
      </div>

    );
  }
}

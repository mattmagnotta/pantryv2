import React, { useState,useEffect } from "react";
import axios from 'axios'
import Dropdown from "react-bootstrap/Dropdown";
import { useHistory } from 'react-router'
import {FaBars} from 'react-icons/fa'
import {Nav,NavbarContainer,MobileIcon,NavMenu,NavItem,NavLinks} from './NavbarElements'

const Navbar = ({toggle}) => {
  const [isLoggedIn, setIsLoggedin] = useState(false)
  const [username, setUsername] = useState('')
  const [isSignedUp, setIsSignedup] = useState(false)

// request the user
  useEffect(async () => {

    // await axios.get('/get_user').then((res) =>{
    //   setUsername(res.data[0].user)
    //   if(res.data === 'No User'){
    //     setIsLoggedin(false)
    //   }
    //   else if(res.data[0].loggedIn === 'true'){
    //
    //     setIsLoggedin(true)
    //   }
    console.log(isLoggedIn)
    // })
  });

  function handleLogout(event){
    axios.get('/logout_user/').then((res) => {
      setIsLoggedin(false)
      setUsername('')
    })
  }


    return (
      <>
        <Nav>
          <NavbarContainer>
            <MobileIcon onClick={toggle}>
              <FaBars />
            </MobileIcon>
            <NavMenu>
              <NavItem>
                <NavLinks
                   to=''
                   >
                  Home
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks
                  to='ingredients'>
                    Ingredients
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to='recipes'>
                  My Recipes
                </NavLinks>
              </NavItem>
              <NavItem>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Account
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/register_user">Sign-up</Dropdown.Item>
                    {isLoggedIn === true &&
                    <Dropdown.Item onClick={handleLogout} href="logout_user" >Logout</Dropdown.Item>}
                    {isLoggedIn === false &&
                    <Dropdown.Item href="login">Login</Dropdown.Item>}
                  </Dropdown.Menu>
                </Dropdown>
              </NavItem>
            </NavMenu>
          </NavbarContainer>
        </Nav>
      </>
    )
}

export default Navbar

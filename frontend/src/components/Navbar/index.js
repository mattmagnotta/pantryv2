import React, { useState,useEffect,useContext } from "react";
import axios from 'axios'
import Dropdown from "react-bootstrap/Dropdown";
import { useHistory } from 'react-router'
import {FaBars} from 'react-icons/fa'
import { UserProvider, UserContext, UserDispatchContext } from '../../Context'
import {Nav,NavbarContainer,MobileIcon,NavMenu,NavItem,NavLinks} from './NavbarElements'

const Navbar = ({toggle}) => {
  const [isLoggedIn, setIsLoggedin] = useState(false)
  const [username, setUsername] = useState('')
  const [isSignedUp, setIsSignedup] = useState(false)
  const userDetails = React.useContext(UserContext);
  const setUserDetails = useContext(UserDispatchContext);

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
                  <Dropdown.Toggle style={{backgroundColor:"#41588c",border:"0px",boxShadow: '0 0px 1px rgba(255, 255, 255, 0.075) inset, 0 0 0px rgba(255, 255, 255, 0.6)'}} variant="success" id="dropdown-basic">
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

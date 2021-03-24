import React from 'react'
import {FaBars} from 'react-icons/fa'
import {Nav,NavbarContainer,MobileIcon,NavMenu,NavItem,NavLinks} from './NavbarElements'

const Navbar = ({toggle}) => {
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
                <NavLinks to='Projects'
                  to='ingredients'>
                    Ingredients
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to='recipes'>
                  Recipes
                </NavLinks>
              </NavItem>
            </NavMenu>
          </NavbarContainer>
        </Nav>
      </>
    )
}

export default Navbar
